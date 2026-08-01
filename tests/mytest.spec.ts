import { test, expect } from "@playwright/test";

test("Launching the Webpage", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
    let title: String = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("Automation Testing Practice: PlaywrightPractice");
})

test("Verifying URL", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
    let url: String = await page.title();
    console.log(url);
    await expect(page).toHaveURL(/automationpractice/);
})