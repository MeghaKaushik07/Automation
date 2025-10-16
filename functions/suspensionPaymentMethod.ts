import { Page } from '@playwright/test';
import { getRandom } from '../Utils/get_random';

/**
 * This function clicks on the Terms & Conditions link, waits for the PDF tab to open, and closes it if it's the expected T&C document.
 *
 * @param page - The Playwright Page object.
 */

// export async function selectPaymentMethod(page: Page): Promise<void> {
//   await page.selectOption('#orgPaymentMethod', { label: 'Pay by Invoice' }); 
// }




// for random payment method


export async function selectPaymentMethod(page: Page): Promise<void> {
  const dropdownSelector = '//select[@name="checkOutPaymentId" and contains(@class, "form__select")]';
  const locator = page.locator(dropdownSelector);
  await locator.waitFor({ state: 'visible' });
  await page.waitForFunction(
    (xpath) => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLSelectElement;
      return element && Array.from(element.options).some(opt => opt.value.trim() !== '');
    },
    dropdownSelector
  );
  const validOptions = await locator.locator('option').evaluateAll((options) =>
    options
      .map(o => (o as HTMLOptionElement).value)
      .filter(v => v.trim() !== '')
  );

  const randomPayment = getRandom(validOptions);
  await locator.selectOption(randomPayment);
  console.log(`Payment method selected: ${randomPayment}`);
}


// for closing PDF tab 
export async function closePdfTab(page: Page): Promise<void> {
  const [pdfPage] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 20000 }),
    page.locator('#termsAndCondition').click()
  ]);


  const pdfUrl = pdfPage.url();
  console.log('PDF page opened at:', pdfUrl);

  if (pdfUrl.includes('Susp_terms_conditions')) {
    console.log('Before close:', page.context().pages().length);
    await pdfPage.close();
    console.log('After close:', page.context().pages().length);
  } else {
    console.log(' Unexpected tab, not closing.');
  }
}


// for proceeding to next page
export async function Next(page: Page): Promise<void> {
  await page.click("//button[@type='button' and contains(@class, 'proceed') and text()='Proceed']");
}

