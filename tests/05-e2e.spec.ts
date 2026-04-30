import { test, expect } from "@playwright/test";
import { LoginPage }    from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage }     from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { USERS, PRODUCTS, CHECKOUT } from "../test-data/users";

test.describe("End-to-End Scenarios", () => {

  test("@smoke full shopping journey — browse, sort, add, checkout", async ({ page }) => {
    const login    = new LoginPage(page);
    const inv      = new InventoryPage(page);
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
    expect(await inv.isOnInventoryPage()).toBe(true);

    await inv.sortBy("lohi");
    const prices = await inv.getProductPrices();
    expect(prices[0]).toBeLessThanOrEqual(prices[prices.length - 1]);

    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.addProductToCart(PRODUCTS.bikeLight);
    expect(await inv.getCartCount()).toBe(2);

    await inv.goToCart();
    expect(await cart.getCartItemCount()).toBe(2);

    await cart.proceedToCheckout();
    await checkout.fillDetails(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.zipCode);
    await checkout.clickContinue();
    await checkout.clickFinish();

    expect(await checkout.isOrderComplete()).toBe(true);
    expect(await checkout.getSuccessMessage()).toContain("Thank you");
  });

  test("@regression multi-item purchase with mid-cart removal", async ({ page }) => {
    const login    = new LoginPage(page);
    const inv      = new InventoryPage(page);
    const cart     = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);

    await inv.addProductToCart(PRODUCTS.backpack);
    await inv.addProductToCart(PRODUCTS.bikeLight);
    await inv.addProductToCart(PRODUCTS.fleeceJacket);
    expect(await inv.getCartCount()).toBe(3);

    await inv.goToCart();
    await cart.removeItem(PRODUCTS.bikeLight);
    expect(await cart.getCartItemCount()).toBe(2);

    await cart.proceedToCheckout();
    await checkout.fillDetails(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.zipCode);
    await checkout.clickContinue();
    await checkout.clickFinish();
    expect(await checkout.isOrderComplete()).toBe(true);
  });
});
