import { test, expect, Locator } from "@playwright/test"

test("verify the dynamic table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const table: Locator = page.locator('#taskTable');
    await expect(table).toBeVisible();
    const trow = await table.locator('tbody tr').all();
    for (const rows of trow) {
        const rowstext = await rows.locator('td').allInnerTexts();
        const browser_text = rowstext[0];

        if (browser_text === 'Firefox') {
            const msize = rows.locator('td')
                .filter({ hasText: 'MB' })
                .filter({ hasNotText: 'MB/s' })
                .filter({ hasNotText: 'Mbps' })
                .first();
            const memtext = await msize.innerText();
            console.log("Merory text", memtext)
            expect(memtext).toContain('MB')
        }
        else if (browser_text == 'Internet Explorer') {
            const disk = rows.locator('td', { hasText: 'MB/s' }).first()
            // const disk = rows.locator('td', { hasText: /\bMB\/s\b/ }).first()
            const dtext = await disk.innerText();
            console.log("Disk space", dtext)
            expect(dtext).toContain('MB/s');


        }
        else if (browser_text === 'Chrome') {
            const cpuLoad = rows.locator('td', { hasText: '%' }).first()
            const cpuloadtext = await cpuLoad.innerText();
            console.log("The CPU load for chrome is :", cpuloadtext);
            expect(cpuloadtext).toContain('%');
        }

        else {
            const networktext = rows.locator('td', { hasText: 'Mbps' }).first()
            const ntext = await networktext.innerText();
            console.log("network size", ntext)
            expect(ntext).toContain('Mbps')
        }
    }
})