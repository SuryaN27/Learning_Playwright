/**
 * ============================================================
 * Test Suite: Booking event
 * ============================================================
 * This test automates the Event booking using Playwright codegen.

**/
import { test, expect } from '@playwright/test';

test('EventHub Booking Test', async ({ page }) => {

  // 1. Launch Application
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  // 2. Verify Login Page
  await expect(page.getByRole('heading', { name: 'Sign in to EventHub' })).toBeVisible();

  // 3. Login
  await page.getByRole('textbox', { name: 'Email' }).fill('mahem80430@micropaste.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Surya@27');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // 4. Verify Successful Login
  await expect(page.getByRole('link', { name: 'EventHub' })).toBeVisible();

  // 5. Browse Events
  await page.getByRole('link', { name: 'Browse Events →' }).click();

  // 6. Verify Event
  await expect(page.getByRole('link', { name: 'Hollywood Monsoon Night — Los' })).toBeVisible();

  // 7. Select Event and Click Book Now
  await page.getByRole('article')
    .filter({ hasText: 'ConcertFeaturedHollywood' })
    .getByTestId('book-now-btn').click();

  // 8. Enter Customer Details
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Surya');
  await page.getByTestId('customer-email').fill('Surya123@yopmail.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9892567187');

  // 9. Confirm Booking
  await page.getByRole('button', { name: 'Confirm Booking' }).click();

  // 10. Verify Booking Confirmation
  await expect(page.getByRole('main')).toContainText('Booking Confirmed! 🎉');

  // 11. Logout
  await page.getByTestId('logout-btn').click();

});