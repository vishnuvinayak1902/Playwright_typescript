import { test } from '@playwright/test';
import { OrangeTask2lastPage } from '../Pages/OrangeTask2last.page';
import {
  getOrangeTask2lastCredentials,
  getOrangeTask2lastMyInfo,
} from '../utils/OrangeTask2lastExcelReader';

// Test data comes from Data/OrangeTask2last.xlsx
const credentials = getOrangeTask2lastCredentials();
const myInfoData = getOrangeTask2lastMyInfo();

for (const cred of credentials) {
  for (const data of myInfoData) {
    test(`OrangeTask2last - Update My Info, reload and verify all fields (${cred.UserName})`, async ({ page }) => {
      const orangePage = new OrangeTask2lastPage(page);

      // 1. Launch the application and log in with Excel credentials
      await orangePage.goto();
      await orangePage.login(cred);

      // 2. Navigate to My Info and fill every field from the Excel file
      await orangePage.openMyInfo();
      await orangePage.fillPersonalDetails(data);
      await orangePage.selectNationalityAndMaritalStatus(data);

      // 3. Save and wait for the Success notification
      await orangePage.saveAndWaitForSuccess();

      // 4. Reload the current page once the success notification is received
      await orangePage.reloadPage();

      // 5. Validate every field on the reloaded page against the Excel file
      await orangePage.verifyAllFieldsMatchExcel(data);
    });
  }
}