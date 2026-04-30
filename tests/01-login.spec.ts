import { test, expect } from "@playwright/test";
import { LoginPage }     from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { USERS }         from "../test-data/users";

test.describe("Login", () => {

  test("@smoke valid login redirects to inventory", async ({ page }) => {
    const login = new LoginPage(page);
    const inv   = new InventoryPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
    expect(await inv.isOnInventoryPage()).toBe(true);
    await expect(inv.title).toHaveText("Products");
  });

  test("@regression locked out user sees error", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.locked.username, USERS.locked.password);
    expect(await login.isErrorVisible()).toBe(true);
    expect(await login.getErrorMessage()).toContain("locked out");
  });

  test("@regression invalid credentials shows error", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.invalid.username, USERS.invalid.password);
    expect(await login.isErrorVisible()).toBe(true);
    expect(await login.getErrorMessage()).toContain("Username and password do not match");
  });

  test("@regression empty username shows error", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("", USERS.standard.password);
    expect(await login.isErrorVisible()).toBe(true);
    expect(await login.getErrorMessage()).toContain("Username is required");
  });

  test("@regression empty password shows error", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, "");
    expect(await login.isErrorVisible()).toBe(true);
    expect(await login.getErrorMessage()).toContain("Password is required");
  });

  test("@smoke logout returns to login page", async ({ page }) => {
    const login = new LoginPage(page);
    const inv   = new InventoryPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
    await inv.logout();
    await expect(page).toHaveURL("/");
  });
});
