import { Page } from '@playwright/test';

/**
 * Checks the checkbox confirming that adequate evidence has been provided.
 *
 * @param page - The Playwright Page instance.
 */


export async function Evidence(page: Page): Promise<void> {
  await page.getByRole('checkbox', { name: 'Adequate evidence has been' }).check();
}

export async function FirstProceed(page: Page): Promise<void> {
  try {
    await page.click("//button[@type='button' and contains(@class, 'form__button') and contains(@class, 'proceed') and text()='Proceed']");
  } catch (error) {
    console.log('Error during form submission:', error);
  }
}

export async function EvidenceAndProceed(page: Page, type: 'bo' | 'fo'): Promise<void> {
  if (type === 'bo') {
    await Evidence(page);
    await FirstProceed(page);
  } else {
    await FirstProceed(page);
  }
}
