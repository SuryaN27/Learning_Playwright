import { test, expect, Locator } from "@playwright/test"

// 1. Absolute XPath (Full XPath) - Not recomended

test("verify the logo is displayed abslute Xpath locator", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    let logo: Locator = page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img");
    await expect(logo).toBeVisible();
})

// 2. Relative XPath (Partial XPath) // with Single attribute
//Syntax:  //tagname[@arrt=value]

test("verify the logo of the website", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    let rlogo = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(rlogo).toBeVisible();
})

// 3. XPath with contains() 

test("xpath with contanis", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    let products: Locator = page.locator("//h2/a[contains(@href,'/build')]");
    // await expect(products).toBeVisible();
    // console.log(await products.textContent());
    let pcount: number = await products.count();
    console.log("product count is:", pcount)
    await expect(pcount).toBeGreaterThan(0);
    console.log(await products.allTextContents()) //Build your own computer

    let productlists: string[] = await products.allTextContents();
    for (const pl of productlists) {
        console.log(pl);
    }
})

// 4. XPath with starts-with()

test("xpath with starts-with()", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    let buildingProducts = page.locator("//h2//a[starts-with(@href,'/build')]")
    const count = await buildingProducts.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBe(3)  // if you know exact count
})

// 5. XPath with text()

test("xpath with text function", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    let registerLink = page.locator("//a[text()='Register']")
    await expect(registerLink).toBeVisible();
})

// 6. XPath with last()

test("xpath with last", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    
    const wishListText = await page.locator("//div[@class='column my-account']//li[last()]").textContent()
    expect(wishListText).toBe('Wishlist')
})

// 7. XPath with position()

test("xpath with position", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const addressesText = await page.locator("//div[@class='column my-account']//li[position()=3]").textContent()
    expect(addressesText).toBe('Addresses')
    const twitterText: string = await page.locator('//div[@class="column follow-us"]//li[position()=2]').innerText();
    expect(twitterText).toBe('Twitter'); // Expect the second social media link to be "Twitter"
})