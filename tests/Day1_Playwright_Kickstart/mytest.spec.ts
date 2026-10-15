import {test,expect} from "@playwright/test";

/*

//
fixture -global variable :page, broweser

test("Title", async ({page})=>{

//step1
//step2
//step3....

})

*/

test("verify the page title",async({page})=>{
await page.goto("https://www.amazon.in/")
let title:string=await page.title();
console.log(title)
await expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    
})
    




