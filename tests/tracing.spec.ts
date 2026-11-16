/*
3 ways to create trace file(.zip)
-----------------------------
1) using playwright.config.ts
2) using command
        npx playwright test mytest.spec.ts --trace on
3) code(programmitically)

        context.tracing.start({screenshots:true,snapshots:true});
        //statements
         context.tracing.stop({path:'trace.zip'});

To view trace file ( 3 ways)
-----------------------------
1) from html file--> click on trace.zip
2) through command  - npx plawright show-trace trace.zip
3) utility  -- > https://trace.playwright.dev/ I  ( drag and drop/upload trace.zip file)

*/

import { test, expect } from '@playwright/test';

test('test', async ({page}) => {

  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('mahem80430@micropaste.com');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('Surya@27');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();

});