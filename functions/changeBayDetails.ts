import { Page } from '@playwright/test';

/*
This function iterates over each available bay and fills in required details before submitting the form.

*/

export async function fillBayDetails(page: Page): Promise<void> {
  const detailsButtonSelector = "//tr[starts-with(@data-original-title, 'Reason')]//div[contains(@class, 'addBayDetailsButton')]";

  console.log('Waiting for at least one bay row to appear...');
  await page.waitForSelector(detailsButtonSelector, { timeout: 25000 }); // wait up to 10s

  const detailButtons = page.locator(detailsButtonSelector);
  const bayCount = await detailButtons.count();

  console.log(`Detected ${bayCount} bay(s) with "Details" button.`);

  for (let i = 0; i < bayCount; i++) {
    console.log(`Processing bay row ${i + 1}`);

    const button = detailButtons.nth(i);

    // Wait until the button becomes visible
    await button.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
      console.log(`Row ${i + 1}: Button not visible in time. Skipping.`);
      return;
    });

    console.log(`Clicking 'Details' for row ${i + 1}`);
    await button.click();

    console.log('Waiting for textarea to appear...');
    await page.waitForSelector("//textarea[@id='houseNumberAndOtherInfo']", { timeout: 5000 });

    console.log('Filling in bay details...');
    await page.locator("//textarea[@id='houseNumberAndOtherInfo']").fill('test');

    console.log('Submitting bay details...');
    await page.click("//button[@type='button' and contains(@class, 'submitBayBtn') and text()='Submit']");

    console.log(`Row ${i + 1} processed.\n`);
  }

  console.log('All available bays processed.');

   page.pause();
}


