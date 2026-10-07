import { Page, Locator, expect } from '@playwright/test';
import { ExcelData1 } from '../utils/OrangeExcelReader';

export class OrangeMyInfoPage {
  readonly page: Page;
  readonly myInfoLink: Locator;
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
  readonly requiredError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.getByRole('textbox').nth(4);
    this.otherIdInput = page.getByRole('textbox').nth(5);
    this.driversLicenseInput = page.locator('.oxd-input-group').filter({ hasText: "Driver's License Number" }).getByRole('textbox');
    this.licenseExpiryInput = page.locator('.oxd-input-group').filter({ hasText: 'License Expiry Date' }).getByRole('textbox');
    this.nationalitySelect = page.locator('.oxd-input-group').filter({ hasText: 'Nationality' }).locator('.oxd-select-text');
    this.maritalStatusSelect = page.locator('.oxd-input-group').filter({ hasText: 'Marital Status' }).locator('.oxd-select-text');
    this.nationalityOption = (name: string) => page.locator('.oxd-select-dropdown').getByRole('option', { name });
    this.maritalStatusOption = (name: string) => page.locator('.oxd-select-dropdown').getByRole('option', { name });
    this.saveButton = page.locator('form').getByRole('button', { name: 'Save' }).first();
    this.successToast = page.getByText('Success', { exact: true });
    this.requiredError = page.getByText('Required', { exact: true });
  }

  async openMyInfo() {
    await this.myInfoLink.click();
  }

  async fillPersonalDetails(data: ExcelData1) {
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
    await this.otherIdInput.fill(data.OtherId);
    await this.driversLicenseInput.click();
    await this.driversLicenseInput.fill(data.DriversLicenseNumber);
    await this.licenseExpiryInput.click();
    await this.licenseExpiryInput.fill(data.Licenseexpirydate);
    // close the calendar popup that opens after filling the date,
    // otherwise it overlays the dropdowns and intercepts clicks
    await this.driversLicenseInput.click(); // move focus away so calendar closes
  }

  async selectNationalityAndMaritalStatus(data: ExcelData1) {
    // make sure no date-picker popup is overlaying the selects
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);

    // Marital Status: click the select, pick the option from the dropdown
    await this.maritalStatusSelect.click();
    await this.maritalStatusOption(data['Marital Status']).click();

    // Nationality: click the select, pick the option from the dropdown
    await this.nationalitySelect.click();
    await this.nationalityOption(data.Nationality).click();
  }

  async saveDetails() {
    await this.saveButton.click();
  }

  async assertSaveSuccess() {
    await expect(this.successToast).toBeVisible();
  }

  async clearFirstNameAndSave() {
    await this.firstNameInput.click();
    await this.firstNameInput.fill('');
    await this.saveButton.click();
  }

  async assertRequiredError() {
    await expect(this.requiredError).toBeVisible();
  }

  /**
   * Reloads My Info page and verifies every saved field matches
   * the values that came from the Excel file.
   */
  async verifySavedDataMatchesExcel(data: ExcelData1) {
    // reload so we read back what was actually persisted on the server
    await this.page.reload();
    await expect(this.firstNameInput).toBeVisible();
    const checks: Array<[Locator, string, string]> = [
      [this.firstNameInput, data.FirstName, 'First Name'],
      [this.middleNameInput, data.MiddleName, 'Middle Name'],
      [this.lastNameInput, data.LastName, 'Last Name'],
      [this.employeeIdInput, data.EmployeeID, 'Employee ID'],
      [this.otherIdInput, data.OtherId, 'Other ID'],
      [this.driversLicenseInput, data.DriversLicenseNumber, "Driver's License Number"],
      [this.licenseExpiryInput, data.Licenseexpirydate, 'License Expiry Date'],
    ];

    for (const [locator, excelValue, fieldName] of checks) {
      await expect(locator, `${fieldName} does not match Excel value "${excelValue}"`).toHaveValue(excelValue);
    }

    // verify Nationality and Marital Status shown in the select widgets
    await expect(this.page.locator('.oxd-select-text').first()).toContainText(data.Nationality);
  }
}


/**
 * OrangeHRM date input uses yyyy-dd-mm (day-month) order.
 * Excel stores the date as yyyy-mm-dd, so convert before filling/verifying.
 */
function toDisplayDate(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  const [, y, mm, dd] = m;
  return `${y}-${dd}-${mm}`;
}
