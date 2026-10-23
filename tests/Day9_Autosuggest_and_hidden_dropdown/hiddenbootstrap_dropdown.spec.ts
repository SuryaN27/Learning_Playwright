import { test, expect, Locator } from "@playwright/test";

test("Bootstrap dropdown handling", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.locator('[type="submit"]').click();

    await page.getByText('PIM').nth(0).click();
    const lastbox = page.locator('[class="oxd-select-text--after"]>i').nth(2);
    await lastbox.click();

    const listoptions: Locator = page.locator('[role="listbox"]>div>span');
    await page.waitForTimeout(5000)

    ////print count of options
    console.log(await listoptions.count())
    const count = await listoptions.count();

    //print all the suggested options in ths console
    const alllist_options: string[] = await listoptions.allTextContents();
    for (const optiontext of alllist_options) {
        console.log(optiontext);
    }

    //click on the Content Specialist option
    for (let i = 0; i < count; i++) {
        const text = await listoptions.nth(i).textContent();
        if (text === 'Content Specialist') {
            await listoptions.nth(i).click();
            break;
        }
    }
})