/* Cheapest Flight Booking
1. Open the BlazeDemo application.
2. Select departure city (San Diego) and destination city (London).
3. Search for available flights.
4. Extract flight prices from the dynamic web table.
5. Sort prices in ascending order and identify the cheapest flight.
6. Select the cheapest flight using its corresponding button.
7. Enter passenger details: name, address, city, and PIN code.
8. Select the credit card type and enter payment details.
9. Submit the booking form.
10. Verify the booking confirmation message using Playwright assertions.
*/

import { test, expect, Locator } from "@playwright/test"

test("Cheapest flight booking", async ({ page }) => {

    // STEP 1: Open the BlazeDemo application

    await page.goto("https://blazedemo.com/")

    // STEP 2: Select departure city

    let from = page.locator('[name="fromPort"]');
    await expect(from).toBeVisible();
    await from.click();
    let from_text = await from.selectOption('San Diego');
    expect(from_text).toContain("San Diego")

    // STEP 3: Select destination city

    let to = page.locator('[name="toPort"]');
    expect(to).toBeVisible();
    await to.click();
    let to_text = await to.selectOption('London');
    expect(to_text).toContain('London')

    // STEP 4: Search for available flights

    let submit = page.locator('[type="submit"]');
    await submit.click();

    //Define empty array

    let arr: string[] = []

    // STEP 5: Collect all flight rows

    let allrows: Locator[] = await page.locator('.table>tbody>tr').all()
    for (const eachrow of allrows) {
        const price = eachrow.locator('td', { hasText: '$' })
        let text = await price.allInnerTexts()
        for (const eachtext of text) {
            arr.push(eachtext);
        }
    }
    arr.sort();
    for (const arrtext of arr) {
        console.log(arrtext)
    }

    console.log("Cheapest flight price is", arr[0])

    for (const price of arr) {
        if (price === arr[0]) {
            const lowestprice = page.locator('[value="Choose This Flight"]').nth(2)
            await lowestprice.click();
        }
    }
    // STEP 6: Enter passenger name

    const name = page.getByPlaceholder('First Last');
    await name.fill("surya")

    // STEP 7: Enter address

    const address = page.locator('#address')
    await address.fill("7th cross")

    // STEP 8: Enter city

    const city = page.locator('#city')
    await city.fill("Mandya")

    // STEP 9: Enter pincode

    const zcode = page.locator('#zipCode')
    await zcode.fill("571401")

    // STEP 10: Enter cardtype

    const ctype = page.locator('.form-inline');
    await ctype.selectOption({ label: 'American Express' })
    //  await countryDropdown.selectOption({ label: 'India' });

    // STEP 11: Enter card number

    const cnum = page.getByPlaceholder('Credit Card Number');
    await cnum.fill("1234 1233 1345")

    // STEP 12: Enter month

    const mon = page.getByPlaceholder('Month');
    await mon.fill("11")

    // STEP 13: Enter year

    const year = page.getByPlaceholder('Year');
    await year.fill("2026")

    // STEP 14: Enter name of cars

    const cardname = page.getByPlaceholder('John Smith');
    await cardname.fill("Suryanarayana")

    // STEP 15: Submit the booking

    const click = page.locator('[value="Purchase Flight"]');
    await click.click();

    // STEP 16: Verify booking confirmation

    const sucesstxt = page.getByText('Thank you for your purchase today!');
    console.log(await sucesstxt.innerText())
    const stext = await sucesstxt.innerText()
    expect(stext).toBe('Thank you for your purchase today!')
})