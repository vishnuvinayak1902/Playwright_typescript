import{test} from'@playwright/test';
import { login } from '../Pages/Task1.page';
import { gettestdata } from '../utils/Orangeexcelreader';
let exceldata= gettestdata('My Info')[0];

test('orangehrm',async({page})=>{

    let loginorange=new login(page);
    await loginorange.navigate();
    await loginorange.fillusername();
    await loginorange.fillpassword();
    await loginorange.doclick();
    await loginorange.checkdashboard();
    await loginorange.fillmyinfo();
    await loginorange.passname();
    await loginorange.passmiddlename();
    await loginorange.passLastName();
    await loginorange.passemployeeid();
    await loginorange.passotherid();
    await loginorange.passlicense();
    await loginorange.licenseexpire();
    await loginorange.setNationality();
})