import { test, expect } from '@playwright/test';
import { smartClick } from '../utility/selfHealer';

test('test xpath with self-healing', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html#');

    // We intentionally break your original xpath to simulate a UI change.
    // Original was: "//button[@id='btn1']"
    const brokenSelector = "//button[@id='btn1-BROKEN']";
    const intent = "The first 'submit' button under 'Form' Section 1";

    // Call our wrapper instead of page.locator().click()
    await smartClick(page, brokenSelector, intent);

    // Optional: Add a small delay just so you can visually see it clicked if running headed
    await page.waitForTimeout(2000);
});