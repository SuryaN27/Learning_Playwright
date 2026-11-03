
import { test, expect } from "@playwright/test"

test("Handling multiple iframes", async ({ page }) => {

    // Navigate to the page containing multiple iframes
    await page.goto('https://ui.vision/demo/webtest/frames/')

    // Get all frames available in the DOM
    const allframes = page.frames();
    console.log("all frames in dom", allframes.length)

    // Locate Frame 1 and enter text
    const frame1 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1' })
    if (frame1) {
        const f1text = frame1.locator('[name="mytext1"]');
        await f1text.fill('surya1')
    }
    else {
        console.log('no frame1 found')
    }

    // Locate Frame 2 and enter text
    const frame2 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_2' })
    if (frame2) {
        const f2text = frame2.locator('[name="mytext2"]');
        await f2text.fill('surya2')
    }
    else {
        console.log('no frame2 found')
    }

    // Locate Frame 3 and enter text
    const frame3 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3' })
    if (frame3) {
        const f3text = frame3.locator('[name="mytext3"]');
        await f3text.fill('surya3')
    }
    else {
        console.log('no frame3 found')
    }

    // Locate Frame 4 and enter text
    const frame4 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_4' })
    if (frame4) {
        const f4text = frame4.locator('[name="mytext4"]');
        await f4text.fill('surya4')
    }
    else {
        console.log('no frame4 found')
    }

    // Locate Frame 5 and enter text
    const frame5 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_5' })
    if (frame5) {
        const f5text = frame5.locator('[name="mytext5"]');
        await f5text.fill('surya4')

        // Locate the hyperlink using its role and accessible name
        const link = frame5.getByRole('link', { name: 'https://a9t9.com' })

        // Verify the hyperlink is visible and click it
        await expect(link).toBeVisible();
        await link.click();

        // Locate the image using its alternative text
        const details = frame5.getByAltText('Ui.Vision by a9t9 software - Image-Driven Automation')

        // Verify the image is visible
        await expect(details).toBeVisible()
    }
    else {
        console.log('no frame5 found')
    }
})

