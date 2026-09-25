import{test,expect,chromium} from'@playwright/test';
test('Task1',async({page})=>{

await page.goto(' https://the-internet.herokuapp.com');
expect(page).toHaveTitle('The Internet')
let title= await page.locator('title').textContent();
console.log(title);
await page.waitForTimeout(2000);
await page.reload();
await page.waitForTimeout(2000);
await page.getByText('JavaScript Alerts').click();
page.once('dialog',async(jsalert)=>{
    await jsalert.accept();
    console.log(jsalert.message());
})
await page.getByRole('button',{name:'Click for JS Alert'}).click();
await page.waitForTimeout(2000); 
page.once('dialog',async(jsconfirm)=>{
    await jsconfirm.dismiss();
    console.log(jsconfirm.message());
})
await page.getByText('Click for JS Confirm').click();
await page.waitForTimeout(2000);
await page.screenshot({path:'image/alerthandling.png',fullPage:true})
await page.waitForTimeout(2000);
await page.goBack();
await page.waitForTimeout(2000);
await page.goForward();
await page.waitForTimeout(2000);
})
