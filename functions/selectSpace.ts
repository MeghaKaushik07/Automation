import { Page } from '@playwright/test';

/**
 * Searches for a bay using a random address related to "Bayswater".
 *
 * - Waits for the search input field to appear.
 * - Randomly selects one of the predefined addresses.
 * - Types the address into the search field with a delay.
 * - Waits for and clicks a relevant search result.
 *
 * @param page - The Playwright Page instance.
 */


export async function SearchBays(page: Page): Promise<void> {
  await page.waitForSelector('input[aria-label="Search"]', { state: 'visible' });

  const addresses = [
    "Bayswater Road,W2 2HH",
    "Bayswater Road,W2 3PH",
    "Bayswater"
  ];
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

  const searchInput = page.locator('input[aria-label="Search"]');
  await searchInput.click();
  await searchInput.fill('');
  await searchInput.type(randomAddress, { delay: 50 });

  await page.waitForSelector("//li[contains(., 'Bayswater')]", { timeout: 10000 });

  const items = await page.locator("//li[contains(., 'Bayswater')]").all();
  for (const item of items) {
    const txt = await item.textContent();
    if (txt?.includes('Bayswater')) {
      await item.click();
      console.log("Bays searched");
      break;
    }
  }
}



export async function SelectedBays(page: Page): Promise<{ zoneId: string, bayType: string }[]> {
  const selectedBayInfo: { zoneId: string, bayType: string }[] = [];

  // const context = await page.context();

  await page.waitForFunction(() => {
    // @ts-ignore
    const source = map?.getSource?.('bays');
    return !!source && !!source._data && source._data.features.length > 0;
  }, { timeout: 30000 });

  const geoJsonData = await page.evaluate(() => {
    // @ts-ignore
    if (map) {
      // @ts-ignore
      const geoJsonSource = map.getSource('bays');
      return geoJsonSource ? geoJsonSource._data : null;
    }
    return null;
  });

  if (!geoJsonData || !geoJsonData.features) {
    console.error("GeoJSON data or features not available.");
    return [];
  }

  const availableFeatures = geoJsonData.features.filter(
    feature => feature.properties.availability?.toLowerCase?.() === 'available'
  );

  if (availableFeatures.length === 0) {
    console.error("No available bays found.");
    return [];
  }

  const shuffled = availableFeatures.sort(() => 0.5 - Math.random());
  const numberToSelect = Math.min(3, Math.max(1, Math.floor(Math.random() * 3) + 1));
  const selectedFeatures = shuffled.slice(0, numberToSelect);

  console.log(`Selecting ${selectedFeatures.length} random available bays.`);

  for (const feature of selectedFeatures) {
    const coords = feature.geometry.coordinates?.[0]?.[0];
    const zoneId = feature.properties.zoneId ?? feature.properties.zoneID ?? feature.properties.zone;
    const bayType = feature.properties.bayType;

    if (coords && zoneId && bayType) {
      console.log(`zoneId: ${zoneId}`);
      console.log(`bayType: ${bayType}`);

      await page.evaluate(({ z, b }) => {
        console.info("zoneId:", z);
        console.info("bayType:", b);
      }, { z: zoneId, b: bayType });

      console.log("Clicking available bay at:", coords);

      await page.evaluate((coord) => {
        // @ts-ignore
        const source = map.getSource('bays');
        if (!source) return;

        const availableFeatures = source._data.features.filter(
          f => f.properties.availability?.toLowerCase?.() === 'available'
        );

        const targetFeature = availableFeatures.find(f =>
          f.geometry.coordinates?.[0]?.[0]?.[0] === coord[0] &&
          f.geometry.coordinates?.[0]?.[0]?.[1] === coord[1]
        );

        if (targetFeature) {
          // @ts-ignore
          suspensionClickHandler(targetFeature);
        }
      }, coords);

      await page.waitForTimeout(3000);

      selectedBayInfo.push({ zoneId, bayType });
    }
  }

  return selectedBayInfo;

}
