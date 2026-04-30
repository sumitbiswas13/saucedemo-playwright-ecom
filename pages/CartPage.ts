import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page:        Page;
  readonly checkoutBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.checkoutBtn = page.locator("[data-test='checkout']");
    this.continueBtn = page.locator("[data-test='continue-shopping']");
  }

  async getCartItems(): Promise<string[]> {
    return this.page.locator(".inventory_item_name").allTextContents();
  }

  async getCartItemCount(): Promise<number> {
    return this.page.locator(".cart_item").count();
  }

  async removeItem(productName: string) {
    const item = this.page.locator(".cart_item").filter({ hasText: productName });
    await item.locator("button").click();
  }

  async proceedToCheckout() { await this.checkoutBtn.click(); }
  async continueShopping()  { await this.continueBtn.click(); }

  async isOnCartPage(): Promise<boolean> {
    return this.page.url().includes("/cart.html");
  }
}
