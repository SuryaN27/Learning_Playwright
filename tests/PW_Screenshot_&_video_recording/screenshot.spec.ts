import {test,expect,Locator} from "@playwright/test"

test("Screenshot capture",async({page})=>{
await page.goto("https://demowebshop.tricentis.com/")

//screenshot pagescreen
const timestamp=Date.now();
//await page.screenshot({path:'screenshot/'+'homepage'+timestamp+'.png'})

//screenshot fullscreen
//await page.screenshot({path:'screenshot/'+'fullscreen'+timestamp+'.png',fullPage:true})

//Screenshot particular element
// const logo=page.locator('[alt="Tricentis Demo Web Shop"]');
// await logo.screenshot({path:'screenshot/'+'elementlogo'+timestamp+'.png'})

// await page.locator('[alt="Tricentis Demo Web Shop"]').screenshot({path:'screenshot/'+'elementlogo'+timestamp+'.png'})

//screenshot product items
await page.locator('[class="product-grid home-page-product-grid"]').screenshot({path:'screenshot/'+'product'+timestamp+'.png'})
})