import { Page, Locator, expect } from '@playwright/test';
import { OrangeEmpRegData } from '../utils/OrangeExcelReader';

export class OrangePimPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly addEmployeeMenu: Locator;
  readonly empFirstNameInput: Locator;
  readonly empMiddleNameInput: Locator;
  readonly empLastNameInput: Locator;
  readonly saveButton: Locator;
  readonly successToast: Locator;
  readonly employeeListMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.employeeListMenu = page.getByRole('link', { name: 'Employee List' });
    this.addEmployeeMenu = page.getByRole('link', { name: 'Add Employee' });
    this.empFirstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.empMiddleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.empLastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successToast = page.getByText('Success', { exact: true });
  }

  async navigateToPimEmployeeList() {
    await this.pimMenu.click();
    await this.employeeListMenu.click();
  }

  async addNewEmployee(data: OrangeEmpRegData) {
    await this.addEmployeeMenu.click();
    await this.empFirstNameInput.fill(data.EmpFirstName);
    await this.empMiddleNameInput.click();
    await this.empMiddleNameInput.fill(data.EmpMiddleName);
    await this.empLastNameInput.click();
    await this.empLastNameInput.fill(data.EmpLastName);
  }

  async submitBtn() {
    await this.saveButton.click();
  }

  async validateToastMessage() {
    await expect(this.successToast).toBeVisible();
  }

  async navigateAgainToEmployeeListing(data: OrangeEmpRegData) {
    await this.navigateToPimEmployeeList();
    await expect(this.page.getByRole('textbox', { name: 'Employee Name' })).toBeVisible();
    const empNameInput = this.page.getByRole('textbox', { name: 'Employee Name' });
    await empNameInput.fill(`${data.EmpFirstName} ${data.EmpMiddleName} ${data.EmpLastName}`);
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator('.oxd-table-body')).toContainText(data.EmpLastName);
  }
}
