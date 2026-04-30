import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page:        Page;
  readonly firstName:   Locator;
  readonly lastName:    Locator;
  readonly zipCode:     Locator;
  readonly continueBtn: Locator;
  readonly finishBtn:   Locator;
  readonly errorMsg:    Locator;
  readonly successMsg:  Locator;
  readonly orderTotal:  Locator;

  constructor(page: Page) {
    this.page        = page;
    this.firstName   = page.locator("[data-test='firstName']");
    this.lastName    = page.locator("[data-test='lastName']");
    this.zipCode     = page.locator("[data-test='postalCode']");
    this.continueBtn = page.locator("[data-test='continue']");
    this.finishBtn   = page.locator("[data-test='finish']");
    this.errorMsg    = page.locator("[data-test='error']");
    this.successMsg  = page.locator(".complete-header");
    this.orderTotal  = page.locator(".summary_total_label");
  }

  async fillDetails(firstName: string, lastName: string, zip: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zip);
  }

  async clickContinue()     { await this.continueBtn.click(); }
  async clickFinish()       { await this.finishBtn.click(); }

  async getOrderTotal(): Promise<string> {
    return (await this.orderTotal.textContent()) || "";
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.successMsg.textContent()) || "";
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMsg.textContent()) || "";
  }

  async isOrderComplete(): Promise<boolean> {
    return this.page.url().includes("/checkout-complete.html");
  }
}
