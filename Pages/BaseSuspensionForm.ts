/**
 * Represents the full flow for submitting a suspension request form.
 * This includes selecting a reason, dates, bays, entering details,
 * choosing payment, and verifying the order ID after booking.
 */

import { Page } from "@playwright/test";
import { SuspensionReasons } from "../functions/selectSusReason";
import { selectStartDate, selectEndDate } from "../functions/suspensionDate";
import { SearchBays, SelectedBays } from "../functions/selectSpace";
import { EvidenceAndProceed } from "../functions/proceedFirst";
import { fillBayDetails } from "../functions/changeBayDetails";
import { ProceedAfterPayment } from "../functions/proceed";
import { closePdfTab, Next, selectPaymentMethod } from "../functions/suspensionPaymentMethod";
import { orderId } from "../functions/orderIdAfterSuspensionBooking";

export class CommonSuspension {
  constructor(private page: Page) {}

  async complete(type: 'fo' | 'bo') {
    try {
      await SuspensionReasons(this.page);
      await selectStartDate(this.page, type);
      await selectEndDate(this.page, type);
      await SearchBays(this.page);
      await SelectedBays(this.page);
      
      await EvidenceAndProceed(this.page, type);
      await fillBayDetails(this.page);
      await ProceedAfterPayment(this.page);
      await selectPaymentMethod(this.page);
      await closePdfTab(this.page);
      await Next(this.page);
      await orderId(this.page);

    } catch (error) {
      console.error('Error in SuspensionFormFlow:', error);
      throw error;
    }
  }
}




