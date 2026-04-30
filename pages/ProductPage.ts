import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page:        Page;
  readonly name:        Locator;
  readonly price:       Locator;
  readonly addToCart:   Locator;
  readonly backBtn:     Locator;

  constructor(page: Page) {
    this.page      = page;
    this.name      = page.locator(".inventory_details_name");
    this.price     = page.locator(".inventory_details_price");
    this.addToCart = page.locator("[data-test='add-to-cart']");
    this.backBtn   = page.locator("[data-test='back-to-products']");
  }

  async getProductName(): Promise<string> {
    return (await this.name.textContent()) || "";
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent()) || "";
  }

  async addToCartFromDetail() { await this.addToCart.click(); }
  async goBackToProducts()    { await this.backBtn.click(); }
}
