import{test,expect,Locator} from "@playwright/test";

test("Verify that the user is able to log in to the Orange application successfully.",async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    const login_title:Locator=page.getByAltText("company-branding");
    await expect(login_title).toBeVisible();

    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");

    await page.getByRole("button",{name:"Login"}).click();

   // const orange_hrm:Locator= page.getByAltText("client brand banner");
    //[alt="client brand banner"]
    const orange_hrm:Locator= page.locator('[alt="client brand banner"]');
    await expect(orange_hrm).toBeVisible();
    
    await page.close();
  
})