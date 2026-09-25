import{test,expect,chromium, firefox} from '@playwright/test';
test('Flipkart',async()=>{

let chrome=await chromium.launch({headless:false});
let window=await chrome.newContext();
let tab=await chrome.newPage();
await tab.goto('https://www.flipkart.com/');
//await tab.locator('#product-0');
await tab.getByAltText('Image').click;
})