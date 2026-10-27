//Dynamic web table: web table contains dynamically changing rows and columns.
/*
// Todo
1.	Open URL https://practice.expandtesting.com/dynamic-table
2.	For Chrome process get value of CPU load.
1.	Identify and locate the entire table body
2.	Capture all rows (<tr>) from the table body.
3.	Iterate each row to check Chrome name/process presence
	Read the first column value using nth(0) to identify the process name.
	Apply a conditional check If the process name equals "Chrome", then:
	Locate the CPU load value using a CSS locator:
	locator("td:has-text('%')") OR locator("td", { hasText: '%' })
	Extract and store the CPU load value.
*/
import { test, expect, Locator } from "@playwright/test"
test("Verift the dynamic element", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const tbody = page.locator('table.table-striped>tbody')
    expect(tbody).toBeVisible();

    const rows: Locator[] = await tbody.locator('tr').all();
    expect(rows).toHaveLength(4);

    let cpuloadtext: string = "";
    for (const eachrowtext of rows) {
        const cell: string[] = await eachrowtext.locator('td').allInnerTexts();
        const browser_text: string = cell[0];
        if (browser_text === 'Chrome') {
            const cpuLoad = eachrowtext.locator('td', { hasText: '%' })
            cpuloadtext = await cpuLoad.innerText();
            console.log("The CPU load for chrome is :", cpuloadtext);
            expect(cpuloadtext).toContain('%');
            break;
        }
    }
    const yellowtext = await page.locator('#chrome-cpu').innerText();
    if (yellowtext.includes(cpuloadtext)) {
        console.log("The CPU load is equal")
        expect(yellowtext).toContain(cpuloadtext)
    }
    else {
        console.log("The CPU load is not equal")
    }

})