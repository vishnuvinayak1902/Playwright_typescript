import { Expect,Page } from "@playwright/test";

import{gettestdata} from'../utils/automationexcelreader'

let newlog=gettestdata('newloginsetup')[0]

export class assessment1{
    readonly automationexe:Page;
    readonly email:any;
    readonly login:any;
readonly password:any
readonly logout:any;
readonly newuser:any
readonly newusermail:any
readonly signup:any;
    constructor(page:Page){
this.automationexe=page
this.email=page.getByPlaceholder('Email Address').first()
this.password=page.locator('input[name="password"]')
this.login=page.locator('[data-qa="login-button"]')
this.logout=page.getByRole('link',{name:" Logout"})
this.newuser=page.getByPlaceholder('Name')
this.newusermail= page.getByPlaceholder('Email Address').nth(1)
this.signup=page.getByRole('button',{name:'Signup'})

}
async navigateURL(){
    await this.automationexe.goto(process.env.base_URL!)
}
async fillemail(){
    await this.email.fill(process.env.Email)
}
async fillpassword(){
    await this.password.fill(process.env.Password)
    await this.automationexe.waitForTimeout(2000);
}
async filllogin(){
    await this.login.click();
    await this.automationexe.waitForTimeout(2000);
} 
async clicklogout(){
    await this.logout.click();
}
async fillnewuser(){
    await this.newuser.fill(String(newlog.Name))
}
async fillnewusermail(){
await this.newusermail.fill(String(newlog.Email));
await this.automationexe.waitForTimeout(2000)
}
async clicksignup(){
    await this.signup.click();
    await this.automationexe.waitForTimeout(2000);

}
}

