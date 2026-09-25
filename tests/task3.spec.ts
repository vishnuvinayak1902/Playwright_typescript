import{test,expect,chromium} from '@playwright/test'
test('task3',async()=>{
    let browser=await chromium.launch({headless:false});
    let window= await browser.newContext();
    let tab=await window.newPage();
    await tab.goto(' https://the-internet.herokuapp.com');
    await tab.waitForTimeout(2000);
    let titletext=await tab.locator('title').textContent();
    console.log(titletext);
    await tab.waitForTimeout(2000);
await tab.getByText('Multiple Windows').click();
await tab.waitForTimeout(2000);2

const [newTab] = await Promise.all([
        window.waitForEvent('page'),
        tab.getByText('Click Here').click() 
    ]); // got blocked on how to handle close that new tab alone.refered gemini and learned but still i have doubt .
//await tab.getByText('Click Here').click();
await tab.waitForTimeout(2000);
await expect(tab.getByText('New Window')).toBeVisible();
let newtab=await tab.getByText('New Window').textContent();
console.log(newtab);
await tab.waitForTimeout(2000);
await tab.screenshot({path:'image/task3.png',fullPage:true})
await tab.waitForTimeout(2000);
await tab.waitForTimeout(2000);
await newTab.close();  
await tab.waitForTimeout(2000);
await tab.goBack();
await tab.waitForTimeout(2000);
await tab.goForward();
await tab.waitForTimeout(2000);

})
