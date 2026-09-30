import { expect, Page } from '@playwright/test';
import { PersonalDetails } from '../utils/codegenTestDataReader';

export class MyInfoPage {
  private get myInfoLink() {
    return this.page.getByRole('link', { name: 'My Info' });
  }

  private get firstNameInput() {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  private get middleNameInput() {
    return this.page.getByRole('textbox', { name: 'Middle Name' });
  }

  private get lastNameInput() {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  // These fields have no accessible name. Scope to the form so the sidebar
  // "Search" textbox cannot shift the positional indexes (that bug made
  // nth(4) hit Employee Id, whose duplicate value failed validation).
  private get otherIdInput() {
    return this.personalDetailsForm.getByRole('textbox').nth(4);
  }

  private get driversLicenseInput() {
    return this.personalDetailsForm.getByRole('textbox').nth(5);
  }

  private get personalDetailsForm() {
    return this.page
      .locator('form')
      .filter({ hasText: 'Employee Full NameEmployee' });
  }

  private get saveButton() {
    return this.personalDetailsForm.getByRole('button', {
      name: 'Save',
    });
  }

  private get successToast() {
    // OrangeHRM shows "Successfully Updated" on this form (not "Saved").
    return this.page.getByText('Successfully Updated');
  }

  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.myInfoLink.click();
    await expect(this.page).toHaveURL(/viewPersonalDetails/);
  }

  // OrangeHRM's Vue inputs the synthetic value change made by fill()
  // (the PUT payload still carries the old values), so type like a user.
  private async typeInto(
    locator: import('@playwright/test').Locator,
    text: string
  ): Promise<void> {
    await locator.click();
    await locator.press('Control+a');
    await locator.pressSequentially(text);
  }

  async updatePersonalDetails(details: PersonalDetails): Promise<void> {
    await this.typeInto(this.firstNameInput, details.firstName);
    await this.typeInto(this.middleNameInput, details.middleName);
    await this.typeInto(this.lastNameInput, details.lastName);
    await this.typeInto(this.otherIdInput, details.otherId);
    await this.typeInto(this.driversLicenseInput, details.driversLicense);
  }

  async savePersonalDetails(): Promise<void> {
    await this.saveButton.click();
    // Wait for the save actually persist before asserting anything.
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
    await expect(this.successToast).toBeHidden(); // form re-rendered with saved data
  }

  async expectPersonalDetails(details: PersonalDetails): Promise<void> {
    await expect(this.firstNameInput).toHaveValue(details.firstName);
    await expect(this.middleNameInput).toHaveValue(details.middleName);
    await expect(this.lastNameInput).toHaveValue(details.lastName);
    await expect(this.otherIdInput).toHaveValue(details.otherId);
    await expect(this.driversLicenseInput).toHaveValue(details.driversLicense);
  }
}
