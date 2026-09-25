// import{test,expect,chromium, firefox} from '@playwright/test';
// test('launchbrowser',async () => {

//     let browser= await chromium.launch({headless:false});
//     let window=await browser.newContext();
//    // let tab=await window.newPage();

//     // await tab.goto('https://developer.chrome.com/');
//     // await tab.goto('https://meet.google.com/');
//     // await tab.goBack();
//     // await tab.goForward();
//     // expect(tab).toHaveTitle('Google Meet: Online Web and Video Conferencing Calls | Google Workspace');

//    // await tab.waitForTimeout(5000);

//     //let tab2=await window.newPage();
//     //await tab2.goto("https://gemini.google.com");

//     let window2=await browser.newContext();
//     let tab3=await window2.newPage();
   
//    await tab3.goto('https://testautomationpractice.blogspot.com/');
//    expect (tab3).toHaveURL('https://testautomationpractice.blogspot.com/');
//    expect (tab3).toHaveTitle('Automation Testing Practice');
//    await tab3.getByPlaceholder('Enter Name').fill("Vishnu");
//    await tab3.locator('#email').fill('Vishnu@gmail.com')
//    await tab3.getByRole('textbox',{name:'Enter Phone'}).fill('2282889');
//    await tab3.getByRole('radio',{name:'Female'}).click();
//    await tab3.locator('#male').click();
//    await tab3.getByRole('combobox',{name:'Country:'}).selectOption('India');
//    await tab3.getByRole('button',{name:'Point Me'}).hover();
//    await tab3.getByRole('link',{name:'Mobiles'}).click();
//    await tab3.getByRole('button',{name:'Copy Text'}).dblclick();
//    await tab3.locator('#draggable').dragTo(tab3.locator('#droppable'));
// await tab3.screenshot({path:'image/screenshot.png',fullPage:true})
// await tab3.screenshot({path:'image/screenshot1.png'})
// await tab3.locator('#singleFileInput').setInputFiles('image/screenshot.png');
// await tab3.getByRole('button',{name:'Upload Single File'}).click();
// await tab3.locator('#multipleFilesInput').setInputFiles(['image/screenshot.png','image/screenshot1.png']);
// await tab3.getByRole('button',{name:'Upload Multiple Files'}).click();
// await tab3.screenshot({path:'image/screenshot2.png',fullPage:true});
// let text=await tab3.getByText('CPU load of Chrome process:').textContent();
// console.log(text);

// tab3.once('dialog',async(simplealert)=>{
// await simplealert.accept();
// console.log(simplealert.message());
// })
// await tab3.getByRole('button',{name:'Simple Alert'}).click();

// tab3.once('dialog',async(confirmation)=>{
//     await confirmation.accept(); // this will help to accept the popups
//     console.log(confirmation.message());
// })
// await tab3.locator('#confirmBtn').click();
// /////
// tab3.once('dialog',async(confirmation)=>{
//     await confirmation.dismiss(); // this will help to accept the popups
//     console.log(confirmation.message());
// })
// await tab3.locator('#confirmBtn').click();
// tab3.once('dialog',async(prompt)=>{
//     prompt.accept('Silambarasan');
//     console.log(prompt.message());
// })
// await tab3.locator('#promptBtn').click();
// let msg=await tab3.locator('#demo').textContent();
// console.log(msg);
// await tab3.locator('#confirmBtn').click();
// tab3.once('dialog',async(prompt)=>{
//     prompt.dismiss();
//     console.log(prompt.message());
// })
// await tab3.locator('#promptBtn').click();
// await tab3.screenshot({path:'image/screenshot3.png',fullPage:true})
// const newtab= tab3.waitForEvent('popup'); //y we  are using this , without this also below button can be executed ?
// await tab3.getByRole('button',{name:'New Tab'}).click();
// const tab6=await newtab;
// const text1=await tab6.getByText('What Is AI and Machine Learning? Core Concepts, Types, and Real-World Uses').textContent();
// console.log(text1);

// // let tab4=await window2.newPage(); 
//    //await tab4.goto('https://www.flipkart.com/');
//    //expect (tab4).toHaveTitle('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!')
//    // await tab3.goBack();
//     //await tab3.goForward();
    
//     await tab3.waitForTimeout(6000);

//     //let tab4= await window2.newPage();
//     //await tab4.goto('https://www.district.in/');

//    // let window3=await browser.newContext();
//     //let tab5= await window3.newPage();
//     //await tab5.goto('https://www.copado.com/')
//     // await tab5.goto('https://www.geeksforgeeks.org/')
//     // await tab5.goBack();
//     // await tab5.goForward();
//     // test.setTimeout(60000);
// });
import{chromium, test} from'@playwright/test'; //10
import { Browserpage } from '../Pages/Launchbrowser1.page'; //11
import { gettestdata } from '../utils/excelreader';
 
let exceldata= gettestdata('Login')[0];
 
test('launchbrowser',async()=>{  //12

    let browser=await chromium.launch();
   let window = await browser.newContext();
   let page= await window.newPage();

let launchbrowser= new Browserpage(page); //13
await launchbrowser.navigate();
await launchbrowser.fillname();
await launchbrowser.fillemail();  // clarified , we r not giving constructor here. we are passing the actions below
await launchbrowser.phonenumber();
await launchbrowser.filladdress();

})
