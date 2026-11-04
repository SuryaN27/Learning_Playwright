/*Objective:
Demonstrate how to handle browser tabs and popup windows in Playwright.

Test Case 1: Verify Tab Handling
Steps:
1. Navigate to https://testautomationpractice.blogspot.com/
2. Capture the title of the current (parent) page
3. Click the "New Tab" button
4. Capture the newly opened tab using the 'page' event
5. Store pages using Promise.all()
6. Validate titles of both parent and child pages
7. Demonstrate switching between pages using references
*/

import { test, expect, Locator, chromium } from "@playwright/test"

test("handling tabs", async () => {
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const parentpage = await browserContext.newPage();
    await parentpage.goto('https://testautomationpractice.blogspot.com/')
    console.log("Title of parent page :", await parentpage.title());

    await expect(parentpage).toHaveTitle('Automation Testing Practice');

    const [childpage] = await Promise.all([browserContext.waitForEvent('page'), parentpage.locator("//button[text()='New Tab']").click()])

    //  browserContext.waitForEvent('page');
    //  const newtab=parentpage.locator("//button[text()='New Tab']");

    console.log("Title of child page :", await childpage.title());

    await expect(childpage).toHaveTitle('SDET-QA Blog');

    const page = browserContext.pages();
    
    const ptitle = await page[0].title();
    console.log(ptitle)

    const ctitle = await page[1].title();
    console.log(ctitle)
})

/*
Test Case 2: Verify Window Handling
Steps:
1. Navigate to the same website
2. Click the "Popup Windows" button
3. Capture the popup window using the 'popup' event
4. Retrieve all open pages/windows using browserContext.pages()
5. Print title and URL for each window
*/
test("pop handling",async()=>{
    const browser =await chromium.launch()
    const browserContext=await browser.newContext();
    const pwindow =await browserContext.newPage();

        await pwindow.goto('https://testautomationpractice.blogspot.com/')


    // pwindow.waitForEvent('popup')
    // const newlink=pwindow.locator('#PopUp')

    const [ckildpopup]=await Promise.all([ pwindow.waitForEvent('popup'),pwindow.locator('#PopUp').click()])

    const allWindowPages=browserContext.pages();
    console.log("all window length",allWindowPages.length)
    console.log(allWindowPages[0].url())
      console.log(allWindowPages[1].url())
      // console.log(allWindowPages[2].url())

        for (const currentPage of allWindowPages) {
        const title = await currentPage.title();

        if (title.includes('Automation Testing Practice')) {
            const dynamicButton:Locator = currentPage.locator('button[onclick="toggleButton(this)"]');
            await dynamicButton.click();
            await expect(dynamicButton).toContainText('STOP');
        } else if (title.includes('Playwright')) {
            const getStarted:Locator = currentPage.getByRole('link', { name: /get started/i }).first();
            await getStarted.click();
        }
    }
})