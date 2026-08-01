import { test, expect, Locator } from "@playwright/test"

test("cheching xpath axes", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");

    const self: Locator = page.locator("//td[text()='3000']/self::td");
    console.log("Self x-path axes", await self.textContent());
    await expect(self).toHaveText('3000');

    const parent: Locator = page.locator("//td[text()='3000']/parent::tr");
    console.log("finding parent axes", await parent.textContent());
    await expect(self).toHaveText('3000');
})