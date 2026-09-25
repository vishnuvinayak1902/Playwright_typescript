import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { MyInfoPage } from '../Pages/myinfopage';
import { codegenTestData } from '../utils/codegenTestDataReader';

const { credentials, personalDetails } = codegenTestData;

test('update employee personal details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myInfoPage = new MyInfoPage(page);

  await loginPage.goto(); // URL comes from .env -> orangehrm_URL
  await loginPage.login(credentials);

  await myInfoPage.open();
  await myInfoPage.updatePersonalDetails(personalDetails);
  await myInfoPage.savePersonalDetails();

  await myInfoPage.expectPersonalDetails(personalDetails);
});