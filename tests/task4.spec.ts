import{test,expect,chromium} from'@playwright/test';
test('task4',async({page})=>{

    await page.goto('https://demoqa.com/upload-download')
    await page.waitForTimeout(2000);
    let title=await page.locator('title').textContent();
    console.log(title); //demosite
    await page.waitForTimeout(2000);
    await page.locator('#uploadFile').setInputFiles('image/task3.png');
await page.waitForTimeout(2000);
await expect (page.locator('#uploadedFilePath')).toBeVisible() //asked for gemini help here
await page.screenshot({path:'image/task4.png',fullPage:true})
await page.waitForTimeout(2000);
await page.reload();
await page.waitForTimeout(2000);
await page.locator('#uploadFile').setInputFiles('image/task4.png');
await page.waitForTimeout(2000);
})
