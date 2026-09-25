import { Expect, Page } from "@playwright/test"; //1
import  jsontestdata  from '../utils/jsontestdata.json';//5 
import { gettestdata } from '../utils/excelreader';
 
let exceldata= gettestdata('Login')[0];
console.log('name',exceldata.name);
//4 from giving inputs in jsonfile

let jsondata = jsontestdata.testdata1; //6
let jsondata1 = jsontestdata.testdata2; //7

export class Browserpage{  //3
readonly Page:Page; //3
readonly name:any;  //3  
readonly Email:any; //3
readonly phone:any; //3
readonly address:any;//3



constructor(Page:Page){  //2

    this.Page = Page;  //2
    this.name = Page.locator('#name'); //2 Here we are locating 
    this.Email = Page.getByPlaceholder('Enter EMail') //2
    this.phone= Page.getByPlaceholder('Enter Phone') //2
   this.address = Page.getByRole('textbox',{name:'Address'}); //2
   

}

async navigate(){ //8 provided the name randomly

    await this.Page.goto('https://testautomationpractice.blogspot.com/') //7 here we r passing the actions

}

async fillname(){

    await this.name.fill(String(exceldata.name)) //9 here we r taking the input from json file.
}

async fillemail(){

    await this.Email.fill(String(exceldata.email))
}

async phonenumber(){

await this.phone.fill(String(exceldata.phonenumber))

}
async filladdress(){
await this.address.fill(String(exceldata.address))
await this.Page.waitForTimeout(2000);
}

}

