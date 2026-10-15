import {test,expect} from "@playwright/test";

test("Verify the URL",async ({page})=>{
   await page.goto("https://www.amazon.in/")
   let url:string =await page.url();
   console.log(url);
   await expect(page).toHaveURL(/amazon/);
})