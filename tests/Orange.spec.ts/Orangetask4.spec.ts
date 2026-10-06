import { test, expect } from '@playwright/test';
import { OrangeLoginPage } from '../../Pages/OrangeLogin.page';
import { OrangeMyInfoPage } from '../../Pages/OrangeMyInfo.page';
import { getOrangeCredentials, getOrangeMyInfo } from '../../utils/OrangeExcelReader';

const credentials = getOrangeCredentials();
const myInfoData = getOrangeMyInfo();

for (const cred of credentials) {
  for (const data of myInfoData) {
    test(`OrangeTask4 - Update My Info and verify saved data matches Excel (${cred.UserName})`, async ({ page }) => {
      const loginPage = new OrangeLoginPage(page);
      const myInfoPage = new OrangeMyInfoPage(page);

      // Step 1: Launch URL from .env file
      await loginPage.goto();

      // Step 2: Login with credentials from Excel file
      await loginPage.login(cred.UserName, cred.PassWord);
      await loginPage.assertDashboardVisible();

      // Step 3: Open My Info and fill details from Excel file
      await myInfoPage.openMyInfo();
      await myInfoPage.fillPersonalDetails(data);
      await myInfoPage.selectNationalityAndMaritalStatus(data);

      // Step 4: Save the details
      await myInfoPage.saveDetails();
      await myInfoPage.assertSaveSuccess();

      // Step 5: Reload the page and verify every saved field matches the Excel data
      await myInfoPage.verifySavedDataMatchesExcel(data);
    });
  }
}
