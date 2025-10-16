import { Page } from '@playwright/test';

/**
 * Selects the checkbox for full 24-hour suspension using the visible label.
 *
 * @param page - The Playwright Page object.
 */


export async function SuspensionFullHours(page: Page): Promise<void> {
  await page.getByLabel('Suspension for 24 hours a day.').check();
}

// export async function BroadBandCustomer(page:Page): Promise<void> {
//   await page.getByLabel('')
// }

export async function SuspensionHours(page: Page): Promise<void> {
  await page.locator('#requireSuspen24Hours').check();
}

export async function ShortNotice(page: Page): Promise<void> {
  await page.locator('label[for="removeShortNoticeFee"]').click();
}
