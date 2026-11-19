
import { test, expect } from '@playwright/test';

// 1. test.only - Execute only this test
test.only('Test 1 - Only annotation', async ({ page }) => {
  console.log('TEST 1: Only annotation started');

  await page.goto('https://www.google.com');
  console.log('Google page opened');

  await expect(page).toHaveTitle(/Google/);
  console.log('TEST 1: Passed');
});

// 2. test.skip - Intentionally skip the test
test.skip('Test 2 - Skip annotation', async ({ page }) => {
  console.log('TEST 2: This log will not execute');

  await page.goto('https://www.google.com');
});

// 3. Conditional skip
test('Test 3 - Conditional skip', async ({ page, browserName }) => {
  console.log('TEST 3: Browser is', browserName);

  test.skip(browserName === 'chromium',
    'Skipping this test in Chromium');

  await page.goto('https://www.google.com');
  console.log('TEST 3: Executed successfully');
});

// 4. test.fail - Expected failure
test('Test 4 - Fail annotation', async ({ page }) => {
  console.log('TEST 4: Expected failure test started');

  test.fail();

  await page.goto('https://www.google.com');

  console.log('Checking incorrect title');
  await expect(page).toHaveTitle('Wrong Title');
});

// 5. test.fixme - Incomplete test
test('Test 5 - Fixme annotation', async ({ page }) => {
  console.log('TEST 5: This test needs fixing');

  test.fixme(true, 'Feature is not implemented yet');

  await page.goto('https://www.google.com');
});

// 6. test.slow - Triple the default timeout
test('Test 6 - Slow annotation', async ({ page }) => {
  console.log('TEST 6: Slow test started');

  test.slow();

  await page.goto('https://www.google.com');

  console.log('Google page loaded');
  await expect(page).toHaveTitle(/Google/);

  console.log('TEST 6: Slow test completed');
});
