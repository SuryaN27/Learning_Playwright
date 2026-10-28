/**
 * Pagination Table Automation
 * ---------------------------------------------------------
 * Objective:
 * 1. Open the DataTables example URL.
 * 2. Read data across all pages dynamically.
 * 3. Handle pagination using a while loop (unknown page count).
 * 4. Extract and print row data from each page.
 * 5. Stop execution when no further pages are available.
 */

import { test, expect, Locator } from "@playwright/test"

test("Verify pagination table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html")
    const tablebody = page.locator('[class="display dataTable"]');
    await expect(tablebody).toBeVisible();

    let hasmoreoage = true;

    while (hasmoreoage) {
        const rows = await page.locator('[class="display dataTable"]>tbody>tr').all();
        for (const row of rows) {
            const rowtext = await row.innerText();
            console.log(rowtext)
        }
        await page.waitForTimeout(2000);
        const next_btn = page.locator('.dt-paging-button.next');
        const attribute = await next_btn.getAttribute('class');
        if (attribute?.includes('disabled')) {
            hasmoreoage = false;
        }
        else {
            await next_btn.click();
        }
    }

})

//'Verify Filter rows and validate row count

test("Verify Filter rows and validate row count", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const filter = page.locator('#dt-length-0');
    await filter.click();
    const select = await filter.selectOption({ value: "25" });
    const all_row = await page.locator('[class="display dataTable"]>tbody>tr').all();
    //expect(all_row).toHaveCount(25);
    expect(all_row.length).toBe(25);


})

/*
 Search for specific data across pages
---------------------------------------------------------
Objective:
1. Capture all rows on the current page.
2. Verify whether result rows exist after search/filter.
3. If the desired record is found:
   - Print the matched text
   - Break the loop
   - Log message: "Record exists"
4. If not found, continue pagination (if applicable).
5. Apply assertion once the match is found to ensure the expected data equals actual data.
*/
test("Search for specific data across pages", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const search_box = page.locator('#dt-search-0');
    //await search_box.isVisible();
    await expect(search_box).toBeVisible();
    await search_box.fill("Hope Fuentes");

    let allrows = await page.locator('#example td').all();
    if (allrows.length > 0) {
        let isMatchfound = false;
        for (const rows of allrows) {
            const text = await rows.innerText();
            if (text.includes('Hope Fuentes')) {
                console.log(" matches found")
                isMatchfound = true;
                break;

            }
        }
        expect(isMatchfound).toBe(true)
    }
    else {
        console.log("no matches found")
    }
}
)


