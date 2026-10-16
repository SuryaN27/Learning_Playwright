import { test, expect, Locator } from "@playwright/test";

// 1) getByAltText() - Locate an image by its alt attribute text
//identifies images (and similar elements) based on the alt attribute.
// Use this locator when your element supports alt text such as img and area elements.

test("Verify the playwright logo is visible", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    let pwimage: Locator = page.getByAltText("Playwright logo");
    await expect(pwimage).toBeVisible();
})


// 2) getByText() - Match visible text content on the page / locate elements by visible text content.
// Use this locator to find non-interactive elements like div, span, p, etc. 
// For interactive elements like button, a, input, etc. use role locators.

test("Verify the text Welocome jhob in the page", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    const jhon: Locator = page.getByText("Welcome, John! 👋");
    await expect(jhon).toBeVisible();
})


// 3) getByRole() - Find by semantic role and accessible name
/* Role locators include buttons, checkboxes, headings, links, lists, tables, 
 and many more and follow W3C specifications for ARIA role.
 Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
*/

test("Verify the signin button is clicked", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    let signin: Locator = page.getByRole("button", { name: "Sign In" });
    await expect(signin).toBeVisible();
    await signin.click();

    let checkbox:Locator=page.getByRole("checkbox",{name:" Subscribe to newsletter"});
    await expect(checkbox).toBeVisible();
    await checkbox.click();

})


// 4) getByLabel() - Locate a form field using its label text
// When to use: Ideal for form fields with visible labels.

test("Verify user is able to enter values in firstname field using label", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    const fname: Locator = page.getByLabel("First Name");
    await expect(fname).toBeVisible();
    await fname.fill("abc");
})


// 5) getByPlaceholder() - Locate an input by placeholder text
// Best for inputs without a label but having a placeholder

test("Verify user is able to enter values in firstname field using placeholder", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    const pholder: Locator = page.getByPlaceholder("Enter your username");
    await expect(pholder).toBeVisible();
    await pholder.fill("Surya")
})


// 6) getByTitle() - Locate an element using its title attribute
// When to use: When your element has a meaningful title attribute. 

test("Verify he title attribute", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");
    const title: Locator = page.getByTitle("Unit test coverage percentage");
    await expect(title).toBeVisible();
})


// 7) getByTestId() - Locate elements using the data-testid attribute
//Locate an element based on its data-testid attribute (other attributes can be configured)
// When to use: When text or role-based locators are unstable or not suitable.

test("Verify he testid attribute", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html");

    const splan: Locator = page.getByTestId("add-to-cart-starter")
    await expect(splan).toBeVisible();
    await splan.click();

    const searchip: Locator = page.getByTestId("search-input")
    await expect(searchip).toBeVisible();
    await searchip.fill("abc");
})


