/**
 * E2E (End-to-End) test to suspend parking for an existing customer (Back Office flow).
 *
 * Steps:
 * - Logs into the Back Office portal.
 * - Initiates a new suspension order.
 * - Selects an existing customer.
 * - Completes the suspension form using the full BaseSuspensionForm flow.
 * - Pauses execution for manual inspection.
 *
 * @throws Rethrows any error that occurs during execution.
 */



import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../../Pages/CommonLogin';
import { CommonSuspension } from '../../Pages/BaseSuspensionForm';
import { Neworder, SelectexistingCustomer } from '../../Pages/SusNewOrderBO';

dotenv.config();

test('suspend parking: select start date', async ({ page }) => {
  try {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage(process.env.BO_LOGIN_URL!);
    await loginPage.login(process.env.BO_USERNAME!, process.env.BO_PASSWORD!);

    await Neworder(page);
    await SelectexistingCustomer(page);

    const form = new CommonSuspension(page);
    await form.complete('bo');

    await page.pause();
  } catch (error) {
    console.error('Test failed: suspend parking - select start date', error);
    throw error;
  }
});


   
    






