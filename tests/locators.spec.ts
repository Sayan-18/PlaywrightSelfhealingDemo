import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/p/playwrightpractice.html");
})

test("test getByAltText", async ({ page }) => {
    const logo = page.getByAltText("logo image");
    await expect(logo).toBeVisible();
})

test("test getByText", async ({ page }) => {
    await expect(page.getByText("List item 1")).toBeVisible(); //full string/full text matching
    await expect(page.getByText("Special")).toBeVisible(); //substring/partial matching
    await expect(page.getByText(/list\s+item\s+1/i)); //reguler expression \s-space, i - ignore case

})

test("test getByRole", async ({ page }) => {
    const textbox = page.getByRole('textbox', { name: 'Username:' });
    await textbox.fill("test");
    const button = page.getByRole('button', { name: 'Primary Action' });
    await button.click();
})

test("test getByLabel", async ({ page }) => {
    const label = page.getByLabel("email");
    await label.fill('email address');
    await expect(label).toBeVisible();
})

test("test getByPlaceholder", async ({ page }) => {
    const placeholder = page.getByPlaceholder('Enter your full name');
    await placeholder.fill('new placeholder');
    await expect(placeholder).toHaveValue('new placeholder');

})

test("test getByTitle", async ({ page }) => {
    await expect(page.getByTitle("Home page link")).toHaveText('Home');
})

test("test getByTestId", async ({ page }) => {
    await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
    //await expect(page.getByTestId('name')).toHaveText('PlaywrightPractice');// This is executing on custom test ID which is configured in use section of config fil. 
})