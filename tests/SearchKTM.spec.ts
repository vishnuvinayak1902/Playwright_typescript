import{test,expect,chromium, firefox} from '@playwright/test';
test('searchKTM',async()=>{

let chrome=await chromium.launch({headless:false});
let window=await chrome.newContext();
let tab=await chrome.newPage();
await tab.goto('https://www.amazon.in/');
await tab.locator('#searchDropdownBox').selectOption('search-alias=automotive');
await tab.getByRole('searchbox',{name:"Search Amazon.in"}).fill('KTM duke 250 bike') //both 9 and 10 will do same steps
//await tab.getByPlaceholder('Search Amazon.in').fill('KTM duke 250 bike')
await tab.locator('#nav-search-submit-button').click();
await tab.mouse.wheel(0, 500);
//await tab.locator('#nav-ftr')
//await tab.locator('#nav-ftr-auth')
//await tab.getByRole('link',{name:"Sign in"}).click();
await tab.getByLabel('')
//let text =await tab.getByText('nav-ftr-copyright');
//console.log(text);
await tab.waitForTimeout(2000);


})