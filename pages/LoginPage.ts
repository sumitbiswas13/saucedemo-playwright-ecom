import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page:     Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page     = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginBtn = page.locator("#login-button");
    this.errorMsg = page.locator("[data-test='error']");
  }

  async goto() { await this.page.goto("/"); }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMsg.textContent()) || "";
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMsg.isVisible();
  }
}
