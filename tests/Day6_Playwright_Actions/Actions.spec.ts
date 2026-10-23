/**
 * This test suite covers common HTML element interactions using Playwright:
 * - Text input fields
 * - Radio buttons
 * - Checkboxes

 */

import { test, expect, Locator } from "@playwright/test";

test("Test input boxes and data to it", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const name: Locator = page.getByPlaceholder('Enter Name');
    await expect(name).toBeVisible();
    await expect(name).toBeEnabled();
    await name.fill("abc");
    const text: string = await name.inputValue()
    console.log(text);
    expect(text).toBe('abc')

    const maxlength: string | null = await name.getAttribute('maxlength');
    expect(maxlength).toBe('15');

})

/**
* Test: Verify radio buttons
* Validates:
* - Default unchecked state
* - Ability to select radio button
* - State after selection
*/

test.only('Verify radio buttons', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
   // const male: Locator = page.locator('input[id="male"]');
   const male: Locator = page.locator('[value="male"]');
   // await male.isDisabled();
   // await male.isEnabled();
   await expect(male).toBeVisible();
   await expect(male).toBeEnabled();
    //const bollean=await expect(male).toBeChecked();
    const bolleanstatus: boolean = await male.isChecked();
    expect(bolleanstatus).toBe(false);
    await expect(male).not.toBeChecked();
    await male.check();

    const bolleanvalue = await male.isChecked();
    expect(bolleanvalue).toBe(true)
    await expect(male).toBeChecked();

    await page.waitForTimeout(4000);

})

/**
 * Test: Verify checkboxes actions
 * Covers:
 * - Single checkbox selection
 * - Selecting all checkboxes
 * - Unchecking specific checkboxes using slice()
 * - Toggle logic
 * - Index-based selection
 * - Label-based selection
 */

test("verify that the ckeckbox is checked", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const sunday: Locator = page.getByLabel('Sunday');
     await expect(sunday).toBeVisible();
    await expect(sunday).toBeEnabled();

    const bolleanvalue = await sunday.isChecked();
    expect(bolleanvalue).toBe(false);

    await sunday.click();
    await expect(sunday).toBeChecked();

    //ii. Create list of checkbox locators using map()

    // const allday:Locator=page.locator('.form-check-input[type="checkbox"]');

    //  for(let i=0;i<await allday.count();i++){
    //     await allday.nth(i).check();
    //  }

    //   for(let i=0;i<await allday.count();i++){
    //     await expect(allday.nth(i)).toBeChecked()
    //  }
    const alldays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const days: Locator[] = alldays.map(index => page.getByLabel(index));
    expect(days.length).toBe(7);

    for (const element of days) {
        await element.check();
        await expect(element).toBeChecked()
    }

    // iv. Uncheck last 3 checkboxes using slice()

    const splicedays: Locator[] = days.slice(-3);
    for (const element of splicedays) {
        await element.uncheck();
        await expect(element).not.toBeChecked()
    }

    // v. Toggle checkboxes, If checked → uncheck, If unchecked → check
    for (const element of days) {
        if (await element.isChecked()) {
            await element.uncheck();
            await expect(element).not.toBeChecked();
        }
        else {
            await element.check();
            await expect(element).toBeChecked();

        }
    }
    await page.waitForTimeout(5000);

    // vi. Select checkboxes by index and assert

    const index: number[] = [1, 3, 5]

    for (const key in index) {
        await days[key].check();
        await expect(days[key]).toBeChecked();
    }

    // vii. Select checkbox based on label dynamically

    const dayname: string = 'Friday';
    for (const labels in days) {

        if (labels.toLowerCase() === dayname.toLowerCase()) {
            const checkbox = page.getByLabel(labels);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

})