import{test,expect,chromium} from'@playwright/test';
test('task5',async({page})=>{

    await page.goto('https://demoqa.com/upload-download')
    await page.waitForTimeout(2000);
    await page.locator('#uploadFile').setInputFiles(['image/task4.png','image/task3.png']);
await page.waitForTimeout(2000);

})