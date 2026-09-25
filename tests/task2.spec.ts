import{test,expect,chromium} from'@playwright/test';
test('Task2',async({page})=>{

    await page.goto(' https://the-internet.herokuapp.com');
expect(page).toHaveTitle('The Internet')
await page.waitForTimeout(2000);
let text=await page.locator('title').textContent();
console.log(text);
await page.waitForTimeout(2000);
await page.getByRole('link',{name:'Dropdown'}).click();
await page.waitForTimeout(2000);
await page.locator('#dropdown').selectOption('Option 1');
await page.waitForTimeout(2000);
await page.reload(); // reload is used for two things 1) to select the option again and 2) to check whether we are in the same page post the reload?
await page.waitForTimeout(2000);
await page.goBack();
await page.waitForTimeout(2000);
await page.getByRole('link',{name:'Add/Remove Elements'}).click();
await page.waitForTimeout(2000);
await page.getByRole('button',{name:'Add Element'}).click();
await page.waitForTimeout(2000);
await expect(page.locator('.added-manually')).toBeVisible(); // to be visible verified from gemini (This is used to check whether the mentioned operation is present?)
await page.waitForTimeout(2000);
await page.getByText('Delete').click();
await expect(page.locator('.added-manually')).toBeHidden(); // to be hiddden verified from gemini (This is used to check whether the mentioned operation is not present?)
await page.waitForTimeout(2000);
await page.getByRole('button',{name:'Add Element'}).hover();
await page.screenshot({path:'image/task2.png',fullPage:true})
})