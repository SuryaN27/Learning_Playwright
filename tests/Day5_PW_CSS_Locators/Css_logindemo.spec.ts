import { test, expect, Locator } from "@playwright/test"

// Login to https://www.saucedemo.com/ website only using CSS locators

test("Login to SauceDemo website successfully", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")
    const logotext: Locator = page.locator('.login_logo');
    await expect(logotext).toHaveText("Swag Labs");

    expect(page.locator('#user-name').isVisible());
    expect(page.locator('#user-name').isEnabled());
    await page.locator('#user-name').fill("standard_user");

    expect(page.locator('[name=password]').isVisible());
    expect(page.locator('[name=password]').isEnabled());
    await page.locator('[name=password]').fill("secret_sauce");

    expect(page.locator('input[class^="submit-button"]').isVisible());
    expect(page.locator('input[class^="submit-button"]').isEnabled());
    await page.locator('input[class^="submit-button"]').click();

    expect(page.locator('.title[data-test="title"]').isVisible());
    expect(page.locator('.title[data-test="title"]').isEnabled());
    const producttext: Locator = page.locator('.title[data-test="title"]');
    const tedxt = await producttext.textContent();
    expect(tedxt).toBe("Products");
    // await page.waitForTimeout(4000);

})