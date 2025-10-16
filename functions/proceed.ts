import { Page } from '@playwright/test';
export async function ProceedAfterPayment(page: Page): Promise<void>  {
    await page.click("//button[contains(@class, 'baysValidateBtn')]");
}