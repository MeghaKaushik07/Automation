import { Page } from 'playwright';
import { getRandom } from '../Utils/get_random';

/**
 * Selects a random suspension reason from the dropdown list.
 *
 * This function:
 * - Waits for the dropdown to become visible.
 * - Ensures there are non-empty options available.
 * - Selects a random valid reason.
 * - Waits for the loader (if present) to disappear after selection.
 *
 * @param page - The Playwright Page instance representing the browser page.
 */


// for any particular reason like 'Filming' and any

// export async function Reasons(page: Page): Promise<void> {
//   const dropdownSelector: string = '#suspensionReason'; 
//   const isXPath = dropdownSelector.startsWith('//');
//   const locator = isXPath ? page.locator(`xpath=${dropdownSelector}`): page.locator(dropdownSelector);

//   await locator.waitFor({ state: 'visible' });

//   // Wait until at least one valid (non-empty) option exists
//   await page.waitForFunction(
//     ({ sel, isXPath }) => {
//       const element = isXPath? document.evaluate(sel, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLSelectElement: document.querySelector(sel) as HTMLSelectElement;
//       return element && Array.from(element.options).some(o => o.value.trim() !== '');
//     },{ sel: dropdownSelector, isXPath }
//   );

//   // await locator.selectOption({ label: 'Filming' });
//   await locator.selectOption({ label: 'Event' });

//   console.log('Selected suspension reason: Filming');

//   // Wait for loader to disappear (if any)
//   await page.waitForFunction(() => !document.querySelector('.loader'));
// }


// for any random reason
export async function SuspensionReasons(page: Page): Promise<void> {
  const dropdownSelector = '#suspensionReason'; 

  const isXPath = dropdownSelector.startsWith('//');

  const locator = isXPath? page.locator(`xpath=${dropdownSelector}`) : page.locator(dropdownSelector);

  await locator.waitFor({ state: 'visible' });

  //  Wait until at least one valid (non-empty) option exists
  await page.waitForFunction(
    ({ sel, isXPath }) => {
      const element = isXPath? document.evaluate(sel, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLSelectElement: document.querySelector(sel) as HTMLSelectElement;
      return element && Array.from(element.options).some(o => o.value.trim() !== '');
    },{ sel: dropdownSelector, isXPath }
  );

  const validOptions = await locator.locator('option').evaluateAll(options =>
    options.map(o => (o as HTMLOptionElement).value).filter(value => value.trim() !== '')
  );

  const randomSusReason = getRandom(validOptions);

  await locator.selectOption(randomSusReason);

  console.log("Selected reason is:", randomSusReason);

  // Wait for loader to disappear (if any)
  await page.waitForFunction(() => !document.querySelector('.loader'));
}