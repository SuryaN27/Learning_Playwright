import { test, expect, Locator } from "@playwright/test";

test("Handling auto suggestion dropdown", async ({ page }) => {
    await page.goto("https://www.flipkart.com/")
    await page.locator('[role="button"]').click();
    await page.locator("input[name='q']").nth(0).fill('smart')
    const alloptions: Locator = page.locator('ul>li');
    await page.waitForTimeout(5000);

    //print count of options
    console.log(await alloptions.count())
    const count = await alloptions.count();

    //print all the suggested options in ths console

     const options:string[]=await alloptions.allTextContents();
     for(const alloptionstext of options){
        console.log(alloptionstext);
     }
    // const second_element_text: string = await alloptions.nth(1).innerText()
    // console.log(second_element_text)
    // console.log("All options are displayed below")
    // for (let i = 0; i < count; i++) {
    //     console.log(await alloptions.nth(i).innerText());
    // }

    //click on the smartphone option
    for (let i = 0; i < count; i++) {
        const textoptions = await alloptions.nth(i).innerText();
        if (textoptions === 'smartphone') {
            await alloptions.nth(i).click()
            break;
        }
    }
})