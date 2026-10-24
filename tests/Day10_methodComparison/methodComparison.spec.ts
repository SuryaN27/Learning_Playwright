import { test, expect, Locator } from '@playwright/test';

test('Verify innerText() Vs textContent() implementation', async ({ page }) => {

    // Step 1: Open Demo Web Shop and navigate to Books page
    await page.goto("https://demowebshop.tricentis.com/desktops");
    await page.getByRole('link', { name: 'Books' }).first().click();

    // Step 2: Locate all book titles
    const books: Locator = page.locator(".item-box h2 > a");

    // Validate total number of books
    await expect(books).toHaveCount(6);

    const booksCount: number = await books.count();
    expect(booksCount).toBe(6);

    // =====================================================
    // 🔹 Print value of a single element
    // =====================================================

    // Using innerText() → Visible text only
    const firstBookText1: string = await books.nth(1).innerText();
    console.log("Using innerText():", firstBookText1);

    // Using textContent() → Visible + Hidden text
    const firstBookText2: string | null = await books.nth(1).textContent();
    console.log("Using textContent():", firstBookText2);

    // =====================================================
    // 🔹 Print values of all elements
    // =====================================================

    // Using allInnerTexts() → Array of visible texts
    const allInnerTexts: string[] = await books.allInnerTexts();
    console.log("Using allInnerTexts():", allInnerTexts);

    // Using allTextContents() → Array of all texts
    const allTextContents: string[] = await books.allTextContents();
    console.log("Using allTextContents():", allTextContents);

    // =====================================================
    // 🔹 Loop Method 1: Traditional for loop
    // Locator is NOT an array, so we use count() + nth()
    // =====================================================

    const count = await books.count();

    for (let i = 0; i < count; i++) {
        console.log("Traditional for loop:", await books.nth(i).innerText());
    }

    // =====================================================
    // 🔹 Loop Method 2: Convert Locator into array
    // locator.all() returns Locator[]
    // Now we can use for...of loop
    // =====================================================

    const booksLocator: Locator[] = await books.all();

    for (let locator of booksLocator) {
        console.log("for...of loop:", await locator.innerText());
    }

    // =====================================================
    // 🔹 Loop Method 3: for...in loop (not recommended for arrays)
    // Iterates over indexes
    // =====================================================

    for (let index in booksLocator) {
        console.log("for...in loop:", await booksLocator[index].innerText());
    }
})