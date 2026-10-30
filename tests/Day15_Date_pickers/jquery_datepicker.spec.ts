import { test, expect, Locator, Page } from "@playwright/test"

test("add date", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const datepicker = page.locator('[id="datepicker"]');
    expect(datepicker).toBeVisible();
    // mm/dd/yyyy
    // await datepicker.fill('21/12/2024');
    // await page.waitForTimeout(2000);
    const month = 'November';
    const year = '2024';
    const date = '21';

    await datepicker.click()

    await page.waitForTimeout(2000);
    let calander = true;
    while (calander) {
        const dmonth = await page.locator('.ui-datepicker-month').textContent();
        const dyear = await page.locator('.ui-datepicker-year').textContent();

        if (dmonth === month && dyear === year) {
            calander = false;
            break;
        }
        else {
            // const nextbtn= page.locator('[class="ui-icon ui-icon-circle-triangle-e"]');
            //await nextbtn.click();
            const previous = page.locator('[class="ui-icon ui-icon-circle-triangle-w"]')
            await previous.click();
        }
    }
    await page.waitForTimeout(2000);
    //date
    const alldates = await page.locator('.ui-datepicker-calendar td').all();
    for (const dates of alldates) {
        const eachdate = await dates.textContent();
        if (date === eachdate) {
            await dates.click();
            break;
        }
    }
})
//test 2
test("using function", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const datepicker = page.locator('[id="datepicker"]');
    expect(datepicker).toBeVisible();
    // mm/dd/yyyy
    // await datepicker.fill('21/12/2024');
    // await page.waitForTimeout(2000);
    // const month = 'November';
    // const year = '2022';
    // const date = '21';

    const month = 'November';
    const year = '2027';
    const date = '21';

    await datepicker.click()
    await dateselect(month, year, date, page, false) //tuue =future fslse=past

    await page.waitForTimeout(2000);
    async function dateselect(tmonth: string, tyear: string, tdate: string, page: Page, ispositive: boolean) {
        while (true) {
            const dmonth = await page.locator('.ui-datepicker-month').textContent();
            const dyear = await page.locator('.ui-datepicker-year').textContent();

            if (dmonth === tmonth && dyear === tyear) {
                break;
            }
            if (ispositive) {
                const nextbtn = page.locator('[class="ui-icon ui-icon-circle-triangle-e"]');
                await nextbtn.click();
            }
            else {
                const previous = page.locator('[class="ui-icon ui-icon-circle-triangle-w"]')
                await previous.click();
            }
            //await page.waitForTimeout(2000);

        }

        //date
        const alldates = await page.locator('.ui-datepicker-calendar td').all();
        for (const dates of alldates) {
            const eachdate = await dates.textContent();
            if (tdate === eachdate) {
                await dates.click();
                break;
            }
        }
    }
})

