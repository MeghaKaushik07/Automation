import { Page } from '@playwright/test';

/*
This function sucessfully selects 'Use existing customer' option, searches for a customer by keyword, 
 and proceeds with the selected entry.
*/

export async function Neworder(page: Page): Promise<void> {
    await page.getByRole('link', { name: 'New order' }).click();
    await page.locator('p', { hasText: 'Apply to suspend parking' }).click();
}

export async function SelectexistingCustomer(page: Page): Promise<void> {
  const label = page.locator("//label[contains(text(),'Use existing customer')]");
  await label.waitFor({ state: 'visible' });
  await label.click();
  const inputBox = page.getByRole('textbox', {name: /Enter name|phone number/i,});
   await inputBox.waitFor({ state: 'visible' });
  await inputBox.fill('Testm');
  const suggestion = page.getByRole('listitem').filter({ hasText: 'Testm Xyz! testmxyz@gmail.com' }).getByRole('strong');
  await suggestion.waitFor({ state: 'visible' });
  await suggestion.click();
  const proceedBtn = page.locator('//button[text()="Proceed"]');
  await proceedBtn.waitFor({ state: 'visible' });
  await proceedBtn.click();
}




