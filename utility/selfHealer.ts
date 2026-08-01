import { Page } from '@playwright/test';

export async function smartClick(
    page: Page,
    originalSelector: string,
    elementIntent: string
) {
    try {
        await page.locator(originalSelector).click({ timeout: 3000 });
        console.log(`✅ Success: Clicked ${originalSelector}`);

    } catch (error) {
        console.log(`⚠️ Failed to click '${originalSelector}'. Initiating self-healing for intent: "${elementIntent}"...`);

        // 2. UPGRADED DOM EXTRACTION: 
        // We get the HTML, but this time we ask Playwright to give us the whole 
        // page content, which is safer than executing a script that misses shadow DOMs.
        const pageHtml = await page.content();

        // To save AI tokens, we strip out massive scripts in Node.js instead of the browser
        const cleanHtml = pageHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');

        const newSelector = await askAIToFindSelector(cleanHtml, elementIntent);

        if (newSelector) {
            console.log(`💊 Healed! AI suggested new selector: ${newSelector}`);

            // 4. Retry the click. We use a slightly longer timeout just in case.
            await page.locator(newSelector).click({ timeout: 8000 });

        } else {
            throw new Error(`Self-healing failed. AI could not find element for: ${elementIntent}`);
        }
    }
}

// Replace the old mock function with this real API integration
async function askAIToFindSelector(html: string, intent: string): Promise<string> {
    console.log(`   -> Sending DOM to AI to find: "${intent}"...`);

    // You will need to set this environment variable in your terminal before running
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("Missing GEMINI_API_KEY environment variable. Please set it.");
    }

    // We give the AI a very strict prompt so it ONLY returns the selector code
    const prompt = `
  You are an expert Playwright automation engineer. 
  I am trying to locate an element with the following intent: "${intent}".
  Below is the HTML of the page.
  
  RULES:
  1. Find the element based on the intent.
  2. Return ONLY a valid CSS selector or XPath that Playwright can use. 
  3. Do not include markdown formatting, explanations, or quotes. Just the raw selector.
  4. Prefer stable attributes like 'id', 'data-testid', or 'name'. 
  5. Avoid brittle text-based XPaths if a better attribute exists.
  
 
  HTML:
  ${html}
  `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        // Extract the text response from the Gemini payload
        let selector = data.candidates[0].content.parts[0].text.trim();

        // Strip out any accidental markdown code blocks if the AI includes them
        selector = selector.replace(/`/g, '').trim();

        return selector;

    } catch (error) {
        console.error("AI API Call Failed:", error);
        return '';
    }
}
