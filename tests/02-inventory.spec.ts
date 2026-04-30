import { test, expect } from "@playwright/test";
import { LoginPage }     from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { USERS, PRODUCTS, SORT_OPTIONS } from "../test-data/users";

test.describe("Inventory / Product Catalog", () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
  });

  test("@smoke inventory page shows 6 products", async ({ page }) => {
    const inv   = new InventoryPage(page);
    const names = await inv.getProductNames();
    expect(names).toHaveLength(6);
  });

  test("@regression sort by name A-Z", async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.sortBy(SORT_OPTIONS.nameAZ);
    const names  = await inv.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("@regression sort by name Z-A", async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.sortBy(SORT_OPTIONS.nameZA);
    const names  = await inv.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("@regression sort by price low to high", async ({ page }) => {
    const inv    = new InventoryPage(page);
    await inv.sortBy(SORT_OPTIONS.priceLow);
    const prices = await inv.getProductPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test("@regression sort by price high to low", async ({ page }) => {
    const inv    = new InventoryPage(page);
    await inv.sortBy(SORT_OPTIONS.priceHigh);
    const prices = await inv.getProductPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });

  test("@smoke clicking product opens detail page", async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.clickProduct(PRODUCTS.backpack);
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator(".inventory_details_name")).toContainText(PRODUCTS.backpack);
  });

  test("@regression all products have valid prices", async ({ page }) => {
    const inv    = new InventoryPage(page);
    const prices = await inv.getProductPrices();
    prices.forEach(p => expect(p).toBeGreaterThan(0));
  });
});
