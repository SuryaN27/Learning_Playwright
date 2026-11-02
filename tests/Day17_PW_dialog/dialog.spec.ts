/**
 * ================================================================
 * Playwright - Handling JavaScript Dialogs (Alert, Confirm, Prompt)
 * ================================================================
 *
 * Dialog Types Covered:
 * 1. Simple Alert      -> alert()
 * 2. Confirmation      -> confirm()
 * 3. Prompt            -> prompt()
 *
 * Notes:
 * - JavaScript dialogs are NOT part of the DOM.
 * - Playwright auto-dismisses dialogs by default.
 * - To control dialog behavior, we must register a listener
 *   using page.on('dialog', handler).
 *
 * Dialog Methods:
 * - dialog.type()        -> Returns type (alert | confirm | prompt | beforeunload)
 * - dialog.message()     -> Returns dialog message
 * - dialog.defaultValue() -> Returns default text (for prompt)
 * - dialog.accept([text]) -> Accepts dialog (OK button / enter value)
 * - dialog.dismiss()     -> Dismisses dialog (Cancel button)
 */

import { test, expect, Locator } from "@playwright/test"

test("handling simple dailog", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    page.on("dialog", (dailog) => {
        console.log("Dailog type is:", dailog.type());
        const type = dailog.type();
        expect(type).toBe('alert')
        const msg = dailog.message();
        console.log("Dailog message:", msg)
        expect(msg).toContain("I am an alert box!")
        dailog.accept();
    })

    const sbtn = page.locator('[id=alertBtn]');
    await sbtn.click();
})

test("handling confirmation dailog", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    page.on("dialog", (dailog) => {
        console.log("Dailog type is:", dailog.type());
        const type = dailog.type();
        expect(type).toBe('confirm')
        const msg = dailog.message();
        console.log("Dailog message:", msg)
        expect(msg).toContain("Press a button!")
        dailog.accept();
    })

    const sbtn = page.locator('[id="confirmBtn"]');
    await sbtn.click();
    const text = page.locator('#demo');
    await expect(text).toContainText('You pressed OK!')
})

test("handling promt dailog", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    page.on("dialog", (dialog) => {
        console.log("default value:", dialog.defaultValue());
        console.log("Dialog type:", dialog.type())
        console.log("Dialog message:", dialog.message())
        dialog.accept("Surya")
    })

    const sbtn = page.locator('[id="promptBtn"]');
    await sbtn.click();
    const text = page.locator('#demo');
    await expect(text).toContainText('Hello Surya! How are you today?')
})
