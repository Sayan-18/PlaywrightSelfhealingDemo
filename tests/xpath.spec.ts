import { test, expect, Locator } from '@playwright/test'
// For loactors in playwright first proprity goes to in-built locators the css then Xpath
test('test xpath', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html#');

    const sumbitBtn: Locator = page.locator("//button[@id='btn1']");
    await sumbitBtn.click();

    const dynamicBtn: Locator = page.locator("//button[@name='start' or @name='stop']");// Using Xpath
    await dynamicBtn.click();
    await expect(page.getByRole('button', { name: /start|stop/i })).toHaveText('STOP');// using reguler expression

    const dynamicWebTableHeading: Locator = page.locator("//h2[contains(text(),'Table')]");

    const tableCount: number = await dynamicWebTableHeading.count();
    expect(tableCount).toBeGreaterThan(0);
    console.log("count", tableCount);
    console.log("Getting the first matching elememt: ", await dynamicWebTableHeading.first().textContent());
    console.log("Getting the Last matching elememt: ", await dynamicWebTableHeading.last().textContent());
    console.log("Getting the n'th matching elememt: ", await dynamicWebTableHeading.nth(1).textContent());// Index starts from 0


    let tables: String[] = await dynamicWebTableHeading.allTextContents();
    console.log(tables);// Will print the array
    for (let t of tables) {
        console.log(t);// Will itarate the array and print one by one element.
    }

})

test("xpath with index", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const lastEle = page.locator("//select[@id='colors']//option[last()]");
    console.log("Finding last element with last() xpath method", await lastEle.textContent());
    await expect(lastEle).toHaveText(/green/i);

    const firstEle = page.locator("//select[@id='colors']//option[1]");
    console.log("Finding first element with index value", await firstEle.textContent());
    await expect(firstEle).toHaveText("Red");

    const anyIndexEle = page.locator("//select[@id='colors']//option[position()=4]");
    console.log("Finding any element with positional value", await anyIndexEle.textContent());
    await expect(anyIndexEle).toHaveText(/yel*/i);

})