/* Scenario
Navigate to the webpage (https://www.bstackdemo.com/)
Locate the Order by dropdown
Verify the dropdown is displayed and enabled
Select Lowest to highest
Retrieve product prices and names
Verify that the product names and prices counts are equal
Print each product name with its corresponding price
Identify and print the lowest-priced product
Identify and print the highest-priced product
*/

import { test, expect, Locator } from "@playwright/test";

test("Verify the price details", async ({ page }) => {
    await page.goto("https://www.bstackdemo.com/")
    const orderBy: Locator = page.getByText('Order by');
    await expect(orderBy).toBeVisible();
    await expect(orderBy).toBeEnabled();
    await orderBy.click();

    // Select the "Lowest to highest" option from the dropdown

    const option: Locator = page.locator("//select")
    await option.selectOption({ value: 'lowestprice' });
    //console.log(await option.inputValue());

    const price: Locator = page.locator('.val');
    await expect(price.first()).toHaveText("$399.00");

    const pricetext: string[] = await price.allTextContents()
    for (const pricelist of pricetext)
        console.log(pricelist)

    const name: Locator = page.locator('.shelf-item__title');
    const nametext: string[] = await name.allTextContents()
    for (const namelist of nametext)
        console.log(namelist)

    // check the product names and prices counts are equal

    expect(pricetext.length).toEqual(nametext.length)

    // Print each product name along with its corresponding price

    const hmap = new Map<String, String>();

    for (let i = 0; i < nametext.length; i++) {
        hmap.set(nametext[i], pricetext[i])
    }
    for (const [name, value] of hmap)
        console.log(name + ' : ' + value)

    // Print the lowest-priced product name and its price

    let lowestprice: Locator = price.first();
    let lowprice = await lowestprice.textContent()

    let lowestname: Locator = name.first();
    let lowname = await lowestname.textContent()

    console.log(`Lowest priced phone: ${lowname},${lowprice}`)

    // Print the highest-priced product name and its price

    let highestprice: Locator = price.last();
    let highprice = await highestprice.textContent()

    let highestname: Locator = name.last();
    let highname = await highestname.textContent()

    console.log(`highest priced phone: ${highname},${highprice}`)

})