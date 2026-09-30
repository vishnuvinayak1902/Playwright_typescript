import{test} from'@playwright/test';
import { assessment1 } from '../Pages/automationexercise.page';
import { gettestdata } from '../utils/automationexcelreader';
//let exceldata= gettestdata('newloginsetup')[0];

test('automationexe',async({page})=>{

    let newprogram= new assessment1(page);
    await newprogram.navigateURL();
    await newprogram.fillemail();
await newprogram.fillpassword();
await newprogram.filllogin();
await newprogram.clicklogout();
await newprogram.fillnewuser();
await newprogram.fillnewusermail();
await newprogram.clicksignup();
})