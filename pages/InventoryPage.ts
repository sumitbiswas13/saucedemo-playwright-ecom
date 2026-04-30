import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page:         Page;
  readonly title:        Locator;
  readonly sortDropdown: Locator;
  readonly cartIcon:     Locator;
  readonly cartBadge:    Locator;
  readonly burgerMenu:   Locator;
  readonly logoutLink:   Locator;

  constructor(page: Page) {
    this.page         = page;
    this.title        = page.locator(".title");
    this.sortDropdown = page.locator("[data-test='product-sort-container']");
    this.cartIcon     = page.locator(".shopping_cart_link");
    this.cartBadge    = page.locator(".shopping_cart_badge");
    this.burgerMenu   = page.locator("#react-burger-menu-btn");
    this.logoutLink   = page.locator("#logout_sidebar_link");
  }

  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes("/inventory.html");
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator(".inventory_item_name").allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator(".inventory_item_price").allTextContents();
    return priceTexts.map(p => parseFloat(p.replace("$", "")));
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator(".inventory_item").filter({ hasText: productName });
    await product.locator("button").click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    return parseInt((await this.cartBadge.textContent()) || "0");
  }

  async clickProduct(productName: string) {
    await this.page.locator(".inventory_item_name").filter({ hasText: productName }).click();
  }

  async goToCart() { await this.cartIcon.click(); }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
