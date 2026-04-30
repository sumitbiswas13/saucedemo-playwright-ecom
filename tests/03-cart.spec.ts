import { test, expect } from "@playwright/test";
import { LoginPage }     from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage }      from "../pages/CartPage";
import { USERS, PRODUCTS } from "../test-data/users";

test.describe("Shopping Cart", () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
  });

  test("@smoke add single item to cart", async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addProductToCart(PRODUCTS.backpack);
    expect(await inv.getCartCount()).toBe(1);
  });

  test("@regression add multiple items updates badge", async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.addProductToCart(PRODUCTS.bikeLight);
    await inv.addProductToCart(PRODUCTS.boltTShirt);
    expect(await inv.getCartCount()).toBe(3);
  });

  test("@regression cart shows correct items", async ({ page }) => {
    const inv  = new InventoryPage(page);
    const cart = new CartPage(page);
    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.addProductToCart(PRODUCTS.bikeLight);
    await inv.goToCart();
    const items = await cart.getCartItems();
    expect(items).toContain(PRODUCTS.backpack);
    expect(items).toContain(PRODUCTS.bikeLight);
    expect(await cart.getCartItemCount()).toBe(2);
  });

  test("@regression remove item from cart", async ({ page }) => {
    const inv  = new InventoryPage(page);
    const cart = new CartPage(page);
    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.addProductToCart(PRODUCTS.bikeLight);
    await inv.goToCart();
    await cart.removeItem(PRODUCTS.backpack);
    const items = await cart.getCartItems();
    expect(items).not.toContain(PRODUCTS.backpack);
    expect(await cart.getCartItemCount()).toBe(1);
  });

  test("@regression empty cart shows no badge", async ({ page }) => {
    const inv = new InventoryPage(page);
    expect(await inv.getCartCount()).toBe(0);
  });

  test("@smoke continue shopping returns to inventory", async ({ page }) => {
    const inv  = new InventoryPage(page);
    const cart = new CartPage(page);
    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.goToCart();
    await cart.continueShopping();
    expect(await inv.isOnInventoryPage()).toBe(true);
  });
});
