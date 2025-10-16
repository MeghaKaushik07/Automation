import { Page } from '@playwright/test';

/**
 * Clicks on the link that navigates to the suspension detail page using the order ID.
 *
 * - Looks for an anchor (`<a>`) tag whose `href` contains 'suspensionDetail?orderId='.
 *
 * @param page - The Playwright Page instance.
 */


export async function orderId(page: Page): Promise<void> {
    await page.click("//a[contains(@href, 'suspensionDetail?orderId=')]");

}
export async function Change(page: Page): Promise<void> {
    await page.click("//div[contains(@class, 'editOtherDetailsBtn') and normalize-space(text())='Change']");
}

