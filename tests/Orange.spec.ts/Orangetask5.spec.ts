import { test, expect } from '@playwright/test';
import { OrangeLoginPage } from '../../Pages/OrangeLogin.page';
import { OrangeMyInfoPage } from '../../Pages/OrangeMyInfo.page';
import { getOrangeCredentials, getOrangeMyInfo } from '../../utils/OrangeExcelReader';

const credentials = getOrangeCredentials();
const myInfoData = getOrangeMyInfo();

for (const cred of credentials) {
  for (const data of myInfoData) {
    test(`OrangeTask5 - Update My Info, save, then verify Required error (${cred.UserName})`, async ({ page }) => {
      const loginPage = new OrangeLoginPage(page);
      const myInfoPage = new OrangeMyInfoPage(page);
      await loginPage.goto();
      await loginPage.login(cred.UserName, cred.PassWord);
      await loginPage.assertDashboardVisible();

      await myInfoPage.openMyInfo();
      await myInfoPage.fillPersonalDetails(data);
      await myInfoPage.selectNationalityAndMaritalStatus(data);
      await myInfoPage.saveDetails();
      await myInfoPage.assertSaveSuccess();

      await myInfoPage.clearFirstNameAndSave();
      await myInfoPage.assertRequiredError();
    });
  }
}
