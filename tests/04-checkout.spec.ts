import { test, expect } from "@playwright/test";
import { LoginPage }    from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage }     from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { USERS, PRODUCTS, CHECKOUT } from "../test-data/users";

test.describe("Checkout Flow", () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const inv   = new InventoryPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.goToCart();
  });

  test("@smoke complete checkout end to end", async ({ page }) => {
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await cart.proceedToCheckout();
    await checkout.fillDetails(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.zipCode);
    await checkout.clickContinue();
    const total = await checkout.getOrderTotal();
    expect(total).toContain("Total:");
    await checkout.clickFinish();
    expect(await checkout.isOrderComplete()).toBe(true);
    expect(await checkout.getSuccessMessage()).toContain("Thank you for your order");
  });

  test("@regression checkout without first name shows error", async ({ page }) => {
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await cart.proceedToCheckout();
    await checkout.fillDetails("", CHECKOUT.lastName, CHECKOUT.zipCode);
    await checkout.clickContinue();
    expect(await checkout.getErrorMessage()).toContain("First Name is required");
  });

  test("@regression checkout without last name shows error", async ({ page }) => {
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await cart.proceedToCheckout();
    await checkout.fillDetails(CHECKOUT.firstName, "", CHECKOUT.zipCode);
    await checkout.clickContinue();
    expect(await checkout.getErrorMessage()).toContain("Last Name is required");
  });

  test("@regression checkout without zip shows error", async ({ page }) => {
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await cart.proceedToCheckout();
    await checkout.fillDetails(CHECKOUT.firstName, CHECKOUT.lastName, "");
    await checkout.clickContinue();
    expect(await checkout.getErrorMessage()).toContain("Postal Code is required");
  });

  test("@regression order total is valid amount", async ({ page }) => {
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await cart.proceedToCheckout();
    await checkout.fillDetails(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.zipCode);
    await checkout.clickContinue();
    const total  = await checkout.getOrderTotal();
    const amount = parseFloat(total.replace(/[^0-9.]/g, ""));
    expect(amount).toBeGreaterThan(0);
  });
});
