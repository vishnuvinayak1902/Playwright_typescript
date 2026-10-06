import { Page, Locator, expect } from '@playwright/test';

export class OrangeLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;
  readonly dashboardMenuItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.dashboardMenuItems = page.locator('nav.oxd-navbar, .oxd-topbar-nav');
  }

  async assertDashboardMenuOptionsDisplayed(menuNames: string[]) {
    await expect(this.dashboardHeading).toBeVisible();
    for (const name of menuNames) {
      await expect(this.page.locator('.oxd-sidepanel, nav').getByRole('link', { name })).toBeVisible();
    }
  }

  async goto() {
    await this.page.goto(process.env.orangehrm_URL!);
  }

  async login(username: string, password: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertDashboardVisible() {
    await expect(this.dashboardHeading).toBeVisible();
  }
}
