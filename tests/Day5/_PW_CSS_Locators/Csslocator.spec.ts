/*
CSS (Cascading Style Sheets) 
===========================================

A web page is built using:
  HTML (Structure)
  CSS (Styling)
  JavaScript (Behavior)

Types of CSS Locators
-------------------------------------------
1) Absolute CSS Locator  (Not commonly used)
2) Relative CSS Locator  (Most commonly used)


Absolute CSS (Never prefer):
html > body > div:nth-of-type(4) > div > div > div:nth-of-type(3) > form > input[id="small-searchterms"]


Common CSS Selector Patterns
-------------------------------------------

tag with id
   tag#id    OR    #id

tag with class
   tag.class   OR   .class

tag with attribute
   tag[attribute=value]   OR   [attribute=value]

tag with class + attribute
   tag.class[attribute=value]   OR   .class[attribute=value]

In Playwright Syntax:
page.locator("css_selector")

Some more Advanced CSS:
---------
Contains    *
Starts-with ^
Ends with  $
Child Selector (parent > child)
Descendant Selector (parent child)
-------------------------------------------
*/
import { test, expect, Locator } from "@playwright/test";

test("CSS selector with ID", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input#small-searchterms')).toBeVisible()
    // await page.locator('input#small-searchterms').fill("tshirt");
    await page.locator('#small-searchterms').fill("tshirt");

})
test("CSS selector with Class", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input.search-box-text')).toBeVisible()
    //await page.locator('input.search-box-text ').fill("tshirt");
    await page.locator('.search-box-text').fill("tshirt");
})

test("CSS selector with Attribute", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input[id="small-searchterms"]')).toBeVisible()
    //await page.locator('input[id="small-searchterms"] ').fill("tshirt");
    await page.locator('[id="small-searchterms"] ').fill("tshirt");

})

test("CSS selector with class with Attribute", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input.search-box-text[id="small-searchterms"]')).toBeVisible()
    await page.locator('input.search-box-text[id="small-searchterms"]').fill("tshirt");
    // await page.waitForTimeout(5000);

})

test("CSS selector with startwith(^)", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input[id^="sma"]')).toBeVisible()
    await page.locator('input[id^="sma"]').fill("tshirt");

})

test("CSS selector with end-with($)", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input[value$="re"]')).toBeVisible()
    await page.locator('input[value$="re"]').fill("tshirt");

})

test("CSS selector with contains(*)", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input[value*=store]')).toBeVisible()
    await page.locator('input[value*=store]').fill("tshirt");

})

test("CSS selector with contains(*) and search product", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator('input[value*=store]')).toBeVisible()
    await page.locator('input[value*=store]').fill("Simple Computer");
    await page.locator('input[type="submit"]').click();
    await expect(page.locator('.product-title>a')).toHaveText("Simple Computer");
})




