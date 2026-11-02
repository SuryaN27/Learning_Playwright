/**
 * =====================================================================
 * Playwright Automation - Handling IFrames
 * =====================================================================
 *
 * What is an IFrame?
 * ---------------------------------------------------------------------
 * IFrame (Inline Frame) is an HTML element that allows embedding another HTML document inside the current HTML page.
 *
 * Example:
 * A webpage contains another webpage inside it → this is an IFrame.
 *
 * Problem in Automation:
 * ---------------------------------------------------------------------
 * Playwright focuses on the main DOM by default.
 * It cannot directly interact with elements inside an iframe.
 *
 * Therefore:
 * We must switch the execution context from main page to iframe.
 * ---------------------------------------------------------------------
 * Methods to Handle IFrames in Playwright:
 * ---------------------------------------------------------------------
 * 1️⃣ Using Frame Object (page.frame())
 *    - page.frame({ name: '<frameName>' })
 *    - page.frame({ url: '<frameURL>' })
 *    - Returns: Frame | null
 *
 * 2️⃣ Using frameLocator()  (Recommended Method)
 *    - page.frameLocator('<locator>')
 *    - Accepts any valid locator
 *    - No need to manually switch context
 *
 * 3️⃣ Handling Child Frames
 *    - frame.childFrames()
 *    - Returns: Array<Frame>
 *
 *
 * Target Application:
 * ---------------------------------------------------------------------
 * https://ui.vision/demo/webtest/frames
 *
 */

import { test, expect, Frame } from "@playwright/test"

test("handling single frame objects", async ({ page }) => {
   // await page.goto('https://ui.vision/demo/webtest/frames')
    await page.goto('https://ui.vision/demo/webtest/frames', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    const frame_count: Frame[] = page.frames();
    console.log("frame count:", frame_count.length)
    const frame = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1' })
    if (frame) {
        await frame.locator('[name="mytext1"]').fill("Surya")
        await expect(frame.locator('[name="mytext1"]')).toHaveValue("Surya");

    }
    else {
        console.log("no frames found")
    }
    await page.waitForTimeout(5000);
})

test("Handling frames using framelocator", async ({ page }) => {
   // await page.goto('https://ui.vision/demo/webtest/frames')
     await page.goto('https://ui.vision/demo/webtest/frames', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    const totalFrames: Frame[] = page.frames();
    console.log("Total number of frames on page:", totalFrames.length);
    const frame2 = page.frameLocator('[src="frame_1.html"]')
    const input = frame2.locator('[name="mytext1"]')
    await input.fill('surya')
    const inputtext = await input.inputValue();
    expect(inputtext).toBe('surya')
})

test("Handling child frames", async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames')
    const totalFrames: Frame[] = page.frames();
    console.log("Total number of frames on page:", totalFrames.length);
    const parent_frame = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3' })
    if (parent_frame) {
        const child_frames = parent_frame.childFrames();
        console.log("Number of child frames:", child_frames.length);
        const radio_btn = child_frames[0].getByLabel('I am a human')
        await radio_btn.check();
        await expect(radio_btn).toBeChecked();
    }
    else {
        console.log("no frames found")
    }

})