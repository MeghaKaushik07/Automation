import { Page } from "@playwright/test";
import { getFutureDate } from "../Utils/dateUtils"; 

/**
 * Selects a start date on the date picker based on the environment type (BO or FO).
 * - For BO: Selects hardcoded date (e.g. 20 Aug).
 * - For FO: Selects a dynamic future date (5 days ahead).
 *
 * @param page - The Playwright Page object.
 * @param type - Type of environment ('bo' for Back Office, 'fo' for Front Office).
 */

export async function selectStartDate(page: Page, type: 'bo' | 'fo'): Promise<void> {
  if (type === 'bo') {
    await page.locator('#startDate > div > div').click();
    await page.locator('th[title="Select Month"]').click();
    await page.locator('//span[contains(text(), "Nov")]').click({ force: true });
    await page.locator("//td[contains(@class, 'day') and text()='12']").first().click({ force: true });
  } else {
    const { monthShort, formatted } = getFutureDate(5); // 5 days ahead

    await page.locator('#startDate > div > div').click();
    await page.locator('th[title="Select Month"]').click();
    await page.locator(`//span[contains(text(), "${monthShort}")]`).click({ force: true });
    await page.locator(`//td[@data-day='${formatted}']`).click({ force: true });
  }
}

export async function selectEndDate(page: Page, type: 'bo' | 'fo'): Promise<void> {
  if (type === 'bo') {
    await page.locator('#endDate > div > div').click();
    await page.locator('th[title="Select Month"]').click();
    await page.locator('//span[contains(text(), "Nov")]').click({ force: true });
    await page.locator("//td[contains(@class, 'day') and text()='18']").first().click({ force: true });
  } else {
    const { monthShort, formatted } = getFutureDate(6); // 6 days ahead

    await page.locator('#endDate > div > div').click();
    await page.locator('th[title="Select Month"]').click();
    await page.locator(`//span[contains(text(), "${monthShort}")]`).click({ force: true });
    await page.locator(`//td[@data-day='${formatted}']`).click({ force: true });
  }
}


// export async function selectStartDate(page: Page, type: 'bo' | 'fo'): Promise<void> {
//   // Define how many days ahead for each type
//   const daysAhead = type === 'bo' ? 5 : 5;
//   const { year, monthShort, date, formatted } = getFutureDate(daysAhead);

//   // Click to open date picker
//   await page.locator('#startDate > div > div').click();

//   // Wait for calendar to appear
//   await page.waitForSelector('th[title="Select Month"]');

//   // Click to switch to month view
//   await page.locator('th[title="Select Month"]').click();

//   // Select the correct month (dynamic)
//   await page.locator(`//span[contains(text(), "${monthShort}")]`).click({ force: true });

//   // Optional: validate the calendar year if needed
//   // await page.locator(`//span[contains(text(), "${year}")]`).click({ force: true });

//   // Click the correct day (unique to that calendar)
//   await page.locator(`//td[contains(@class, 'day') and text()='${parseInt(date)}']`).click({ force: true });

//   // Validate selected date is not in the past
//   const today = new Date();
//   const selected = new Date(formatted);
//   if (selected < today) {
//     throw new Error(`❌ Invalid date selected: ${formatted} (in the past)`);
//   }

//   console.log(`✅ Start date selected: ${formatted}`);
// }

// export async function selectEndDate(page: Page, type: 'bo' | 'fo'): Promise<void> {
//   const daysAhead = type === 'bo' ? 6 : 6;
//   const { year, monthShort, date, formatted } = getFutureDate(daysAhead);

//   await page.locator('#endDate > div > div').click();
//   await page.waitForSelector('th[title="Select Month"]');
//   await page.locator('th[title="Select Month"]').click();
//   await page.locator(`//span[contains(text(), "${monthShort}")]`).click({ force: true });
//   await page.locator(`//td[contains(@class, 'day') and text()='${parseInt(date)}']`).click({ force: true });

//   const today = new Date();
//   const selected = new Date(formatted);
//   if (selected < today) {
//     throw new Error(`❌ Invalid date selected: ${formatted} (in the past)`);
//   }

//   console.log(`✅ End date selected: ${formatted}`);
// }
















