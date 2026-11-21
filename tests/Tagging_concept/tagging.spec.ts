/*
Run all sanity tests
npx playwright test tagging.spec.ts --grep "@sanity"

Run all regression tests
npx playwright test tagging.spec.ts --grep "@regression"

Run tests belonging to both Sanity AND Regression (AND)
npx playwright test tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"

Run tests belonging to either Sanity OR Regression (OR)
npx playwright test tagging.spec.ts --grep "@sanity|@regression"

Run tests belonging to Sanity but NOT Regression
npx playwright test tagging.spec.ts --grep "@sanity" --grep-invert "@regression"

Run all tests EXCEPT Sanity
npx playwright test tagging.spec.ts --grep-invert "@sanity"

*/

import { test, expect } from '@playwright/test';

test('Check homepage title @sanity', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('Check homepage title', { tag: '@sanity' }, async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('Check recommendations', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
    await page.goto('https://www.google.com');
    await page.click('text=Store');
    await expect(page.locator('text=Our top recommendations')).toBeVisible();
});

test('Check homepage title', { tag: '@regression' }, async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});
