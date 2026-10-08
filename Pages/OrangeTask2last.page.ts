import { Page, Locator, expect } from '@playwright/test';
import type { OrangeCredentials, OrangeMyInfoData } from '../utils/OrangeTask2lastExcelReader';

/**
 * Page Object for the OrangeHRM flows used by OrangeTask2last:
 * login -> Dashboard -> My Info -> update Personal Details -> Save -> read back.
 */
export class OrangeTask2lastPage {
  readonly page: Page;

  // Login
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;

  // Dashboard
  readonly myInfoLink: Locator;

  // My Info - personal details
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly otherIdInput: Locator;
  readonly driversLicenseInput: Locator;
  readonly licenseExpiryInput: Locator;
  readonly nationalitySelect: Locator;
  readonly maritalStatusSelect: Locator;
  readonly nationalityOption: (name: string) => Locator;
  readonly maritalStatusOption: (name: string) => Locator;
  readonly saveButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });

    // Dashboard navigation
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });

    // Personal details
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).getByRole('textbox');
    this.otherIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Other Id' }).getByRole('textbox');
    this.driversLicenseInput = page.locator('.oxd-input-group').filter({ hasText: "Driver's License Number" }).getByRole('textbox');
    this.licenseExpiryInput = page.locator('.oxd-input-group').filter({ hasText: 'License Expiry Date' }).getByRole('textbox');
    this.nationalitySelect = page.locator('.oxd-input-group').filter({ hasText: 'Nationality' }).locator('.oxd-select-text');
    this.maritalStatusSelect = page.locator('.oxd-input-group').filter({ hasText: 'Marital Status' }).locator('.oxd-select-text');
    this.nationalityOption = (name: string) => page.locator('.oxd-select-dropdown').getByRole('option', { name });
    this.maritalStatusOption = (name: string) => page.locator('.oxd-select-dropdown').getByRole('option', { name });
    this.saveButton = page.locator('form').getByRole('button', { name: 'Save' }).first();
    this.successToast = page.getByText('Success', { exact: true });
  }

  /** Launch the application under test. */
  async goto() {
    await this.page.goto(process.env.orangehrm_URL!);
  }

  /** Perform login using credentials from the Excel file. */
  async login(credentials: OrangeCredentials) {
    await this.usernameInput.click();
    await this.usernameInput.fill(credentials.UserName);
    await this.passwordInput.click();
    await this.passwordInput.fill(credentials.PassWord);
    await this.loginButton.click();
    await expect(this.dashboardHeading).toBeVisible();
  }

  /** Open My Info from the left menu. */
  async openMyInfo() {
    await this.myInfoLink.click();
    await expect(this.firstNameInput).toBeVisible();
  }

  /** Fill every personal-detail field with the values coming from Excel. */
  async fillPersonalDetails(data: OrangeMyInfoData) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(data.FirstName);

    await this.middleNameInput.click();
    await this.middleNameInput.fill(data.MiddleName);

    await this.lastNameInput.click();
    await this.lastNameInput.fill(data.LastName);

    await this.employeeIdInput.click();
    await this.employeeIdInput.press('Shift+Home');
    await this.employeeIdInput.fill(data.EmployeeID);

    await this.otherIdInput.click();
    await this.otherIdInput.press('Shift+Home');
    await this.otherIdInput.fill(data.OtherId);

    await this.driversLicenseInput.click();
    await this.driversLicenseInput.press('Shift+Home');
    await this.driversLicenseInput.fill(data.DriversLicenseNumber);

    await this.licenseExpiryInput.click();
    await this.licenseExpiryInput.press('Shift+Home');
    await this.licenseExpiryInput.fill(data.Licenseexpirydate);
    // Close the calendar popup so it does not overlay the dropdowns below.
    await this.page.keyboard.press('Escape');
  }

  /** Choose Nationality and Marital Status from their dropdowns. */
  async selectNationalityAndMaritalStatus(data: OrangeMyInfoData) {
    await this.nationalitySelect.click();
    await this.nationalityOption(data.Nationality).click();

    await this.maritalStatusSelect.click();
    await this.maritalStatusOption(data['Marital Status']).click();
  }

  /** Click Save and wait for the Success notification to appear. */
  async saveAndWaitForSuccess() {
    await this.saveButton.click();
    await expect(this.successToast).toBeVisible();
  }

  /** Reload the current page (required after the success notification). */
  async reloadPage() {
    await this.page.reload();
    await expect(this.firstNameInput).toBeVisible();
  }

  /**
   * Read every field back from the reloaded page and assert it matches
   * the corresponding value in the Excel file.
   */
  async verifyAllFieldsMatchExcel(data: OrangeMyInfoData) {
    const textFieldChecks: Array<[Locator, string, string]> = [
      [this.firstNameInput, data.FirstName, 'First Name'],
      [this.middleNameInput, data.MiddleName, 'Middle Name'],
      [this.lastNameInput, data.LastName, 'Last Name'],
      [this.employeeIdInput, data.EmployeeID, 'Employee Id'],
      [this.otherIdInput, data.OtherId, 'Other Id'],
      [this.driversLicenseInput, data.DriversLicenseNumber, "Driver's License Number"],
      [this.licenseExpiryInput, data.Licenseexpirydate, 'License Expiry Date'],
    ];

    for (const [locator, excelValue, fieldName] of textFieldChecks) {
      await expect(
        locator,
        `${fieldName} did not match Excel value "${excelValue}"`,
      ).toHaveValue(excelValue);
    }

    // Dropdown-backed fields are read from the select widget's text.
    await expect(
      this.nationalitySelect,
      `Nationality did not match Excel value "${data.Nationality}"`,
    ).toContainText(data.Nationality);

    await expect(
      this.maritalStatusSelect,
      `Marital Status did not match Excel value "${data['Marital Status']}"`,
    ).toContainText(data['Marital Status']);
  }
}
