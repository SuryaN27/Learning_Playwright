// Actions | Static Dropdowns | Select Options | Part1
// Single select dropdown (static dropdown)


/**
 * Test Suite: Dropdown validations using Playwright
 * Website: https://testautomationpractice.blogspot.com/
 *
 * This file covers:
 * 1. Single select dropdown operations
 * 2. Multi-select dropdown operations
 * 3. Sorted dropdown verification
 * 4. Duplicate value identification using Set
 */
import { test, expect, Locator } from "@playwright/test"

test("Verify single select dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const countryDropdown: Locator = page.locator('#country');
    // Select option from dropdown using different approaches

    // 1 Select by visible text
     await countryDropdown.selectOption('India');

    // 2 Select by value attribute
     await countryDropdown.selectOption({ value: 'india' });

    // 3 Select by label
     await countryDropdown.selectOption({ label: 'India' });

    // 4 Select by index
    await countryDropdown.selectOption({ index: 3 });

    //count 
    const dropdownOptions: Locator = page.locator('#country>option');
    //  expect(dropdownOptions).toHaveCount(10);

    // Verify specific option exists
    const alloption: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

    expect(alloption).toContain('Japan');

    // Print all dropdown values
    for (const option of alloption) {
        console.log('All dropdown options:', option)

    }
})

/**
 * ------------------------------------------------------
 * Test Case: Verify Multi-Select Dropdown
 * ------------------------------------------------------
 * Validates:
 * - Multiple selection techniques
 * - Option count
 * - Presence of specific option
 * - Printing all values
 */

test("Multi select dropdown'", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    console.log("Current URL:", page.url());
    const multicolour: Locator = page.locator('#colors');
    await multicolour.selectOption(['Red','Green'])
     await multicolour.selectOption(['Red','Green','White'])
    await multicolour.selectOption([{label:'Red'},{label:'Green'},{label:'White'}])
    multicolour.selectOption([{ index: 0 }, { index: 2 }, { index: 5 }])

    await page.waitForTimeout(5000)

    // Validate number of dropdown options
    const allcolourOptions: Locator = page.locator('#colors option');
    expect(allcolourOptions).toHaveCount(7);

    console.log("Dropdown count:", await page.locator("#colors").count());
console.log("Options count:", await page.locator("#colors option").count());

    // Validate specific option exists
    const options: string[] = (await allcolourOptions.allTextContents()).map(text => text.trim());
    expect(options).toContain('Blue')

    for (const alloptions of options) {
        console.log("All multicolor options", alloptions)
    }
})
/**
 * ------------------------------------------------------
 * Test Case: Verify Sorted Dropdown List
 * ------------------------------------------------------
 * Validates:
 * - Dropdown values are already sorted alphabetically
 */
test('Verify sorted list dropdown', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const sortedlistpage: Locator = page.locator('#animals option'); //sorted
    // const sortedlistpage:Locator=page.locator('#colors option'); //not sorted

    const slist = (await sortedlistpage.allTextContents()).map(text => text.trim())

    const orginal: string[] = [...slist];
    console.log(orginal);

    const sorted: string[] = [...slist].sort();
    console.log(sorted)

    expect(orginal).toEqual(sorted);
})

/**
 * ------------------------------------------------------
 * Test Case: Verify Duplicate Dropdown Elements
 * ------------------------------------------------------
 * Validates:
 * - Detection of duplicate values using Set
 * - Separation of unique and duplicate elements
 */

test('Verify duplicate array elements', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const sortedlistpage: Locator = page.locator('#animals option'); //sorted
    //const sortedlistpage:Locator=page.locator('#colors option'); //not sorted

    const trimlist: string[] = (await sortedlistpage.allTextContents()).map(Text => Text.trim())

    const set = new Set<String>();
    const dupliactes: string[] = [];

    for (const text of trimlist) {
        if (set.has(text)) {
            dupliactes.push(text)
        }
        else {
            set.add(text);
        }

    }
    console.log("Duplicate Values:",dupliactes);
    console.log("Unique Values:",set);
})
