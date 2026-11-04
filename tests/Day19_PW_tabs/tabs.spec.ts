import { test, expect, Locator, chromium, BrowserContext } from '@playwright/test'

test("tabs", async () => {
    const browser = await chromium.launch();
    //const bcontext= await browser.newContext()
    const bcontext: BrowserContext = await browser.newContext();
    const page1 = await bcontext.newPage();
    const page2 = await bcontext.newPage();

    const totalContexts: BrowserContext[] = browser.contexts();
    console.log("No of contexts :", totalContexts.length);

    const totalPages = bcontext.pages();
    console.log("No of pages :", totalPages.length);

    await page1.goto('https://www.selenium.dev/');
    await expect(page1).toHaveTitle('Selenium')
    console.log(await page1.title());

    await page2.goto('https://playwright.dev/');
    await expect(page2).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
    console.log(await page2.title())

})