import { test, expect } from '@playwright/test';
import { OrangeLoginPage } from '../../Pages/OrangeLogin.page';
import { getOrangeCredentials } from '../../utils/OrangeExcelReader';

const credentials = getOrangeCredentials();

for (const cred of credentials) {
  test(`OrangeTask1 - Login and verify Dashboard (${cred.UserName})`, async ({ page }) => {
    const loginPage = new OrangeLoginPage(page);
    await loginPage.goto();
    await loginPage.login(cred.UserName, cred.PassWord);
    await loginPage.assertDashboardVisible();
  });
}
