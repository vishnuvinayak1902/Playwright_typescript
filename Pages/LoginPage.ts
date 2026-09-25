import { expect, Page } from '@playwright/test';

export interface Credentials {
  username: string;
  password: string;
}

export class LoginPage {
  private get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  private get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  constructor(private readonly page: Page) {}

  async goto(url: string = process.env.orangehrm_URL ?? ''): Promise<void> {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(/auth\/login/);
  }

  async login(credentials: Credentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();

    await expect(this.page).toHaveURL(/dashboard/);
  }
}