import { expect, Expect,Page } from "@playwright/test";
import { gettestdata } from '../utils/Orangeexcelreader';
//import strict from "node:assert/strict";
let ExcelData1= gettestdata('My Info')[0];

export class login {
    readonly orangeURL:Page;
    readonly username:any;
    readonly password:any;
    readonly clicklogin:any;
    readonly dashboardcheck:any
    readonly myinfo:any;
    readonly fillname:any;
    readonly fillmiddlename:any
readonly filllastname:any
readonly fillemployeeID:any
readonly fillOtherId:any;
readonly fillDriversLicenseNumber:any
readonly Licenseexpirydate:any
readonly Nationality:any
constructor(page:Page){
        
this.orangeURL=page;
this.username= page.getByPlaceholder('Username');
this.password=page.getByPlaceholder('Password');
this.clicklogin=page.getByRole('button',{name:' Login '})
this.dashboardcheck=page.getByRole('heading',{name:'Dashboard'})
this.myinfo=page.getByRole('link',{name:'My Info'})
this.fillname=page.locator('[name="firstName"]')
this.fillmiddlename=page.locator('[name="middleName"]');
this.filllastname=page.getByPlaceholder('Last Name');
//this.fillOtherId= page.getByLabel('Other Id');
this.fillemployeeID=page.getByRole('textbox').nth(4)
//this.fillemployeeID=page.getByLabel('Employee Id');
this.fillOtherId= page.getByRole('textbox').nth(5)
this.fillDriversLicenseNumber=page.getByRole('textbox').nth(6);
//this.Licenseexpirydate=page.getByPlaceholder('yyyy-dd-mm').nth(0);
this.Licenseexpirydate=page.getByPlaceholder('yyyy-dd-mm').first();
this.Nationality=page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first()

 
    }
async navigate(){
    await this.orangeURL.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
}

async fillusername(){
    await this.username.fill('Admin')
}
async fillpassword(){
    await this.password.fill('admin123')
}
async doclick(){
    await this.clicklogin.click();
    await this.orangeURL.waitForTimeout(2000);
    
}
async checkdashboard(){
     await expect(this.dashboardcheck).toBeVisible();
}
async fillmyinfo(){
    await this.myinfo.click();
     await this.orangeURL.waitForTimeout(2000);
}
async passname(){
    await this.orangeURL.waitForTimeout(2000);
    await this.fillname.fill(String(ExcelData1.FirstName));
}
async passmiddlename(){
await this.orangeURL.waitForTimeout(2000);
await this.fillmiddlename.fill(String(ExcelData1.MiddleName));
}    
async passLastName(){
    await this.orangeURL.waitForTimeout(2000);
await this.filllastname.fill(String(ExcelData1.LastName));
}
async passemployeeid(){
    await this.orangeURL.waitForTimeout(2000);
await this.fillemployeeID.fill(String(ExcelData1.EmployeeID));
}
async passotherid(){
    await this.orangeURL.waitForTimeout(2000);
await this.fillOtherId.fill(String(ExcelData1.OtherId));
}
async passlicense(){
    await this.orangeURL.waitForTimeout(2000);
    await this.fillDriversLicenseNumber.fill(String(ExcelData1.DriversLicenseNumber));
}
async licenseexpire(){
    await this.orangeURL.waitForTimeout(2000);
    await this.Licenseexpirydate.fill(String(ExcelData1.Licenseexpirydate));
}
async setNationality(){
    await this.Nationality.click()
    await this.orangeURL.getByRole('option', { name: ExcelData1.Nationality }).click();
    //await this.Nationality.getByText(String(ExcelData1.Nationality),{exact: true }).click();
await this.orangeURL.waitForTimeout(2000);
}
}