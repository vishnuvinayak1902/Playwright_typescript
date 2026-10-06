import { test, expect } from '@playwright/test';
import { OrangeLoginPage } from '../../Pages/OrangeLogin.page';
import { OrangeMyInfoPage } from '../../Pages/OrangeMyInfo.page';
import { getOrangeCredentials } from '../../utils/OrangeExcelReader';

const credentials = getOrangeCredentials();

for (const cred of credentials) {
  test(`OrangeTask2 - Login and open My Info (${cred.UserName})`, async ({ page }) => {
    const loginPage = new OrangeLoginPage(page);
    const myInfoPage = new OrangeMyInfoPage(page);
    await loginPage.goto();
    await loginPage.login(cred.UserName, cred.PassWord);
    await loginPage.assertDashboardVisible();
    await myInfoPage.openMyInfo();
  });
}
