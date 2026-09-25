import {test,expect,chromium} from'@playwright/test';
test('redbus_date',async({page})=>{

    await page.goto('https://www.redbus.in/');
    //await page.getByRole('combobox',{name:'From'}).selectOption('chennai');
    await page.locator('#srcinput').fill('Chennai');
    await page.waitForTimeout(2000);
    //await page.keyboard.press("Enter");
    await page.locator('#suggestion-2').click();
    await page.locator('#destinput').fill('Tirunelveli');
    await page.waitForTimeout(2000);
    await page.locator('#suggestion-4').click();
    //await page.getByPlaceholder("Search Boarding Point").fill('Chennai');
await page.waitForTimeout(2000);
//await page.getByRole('dialog',{name:'Select date of journey'}).click();
await page.waitForTimeout(2000);
//await page.getByRole('dialog',{name:'Select date of journey'}).fill('05 Sep, 2026');
//await page.getByRole('button',{name:'Sunday, September 6, 2026, selected'}).click();
//await page.locator('date___b0d8ac selected___9b0571  calendarDate').click();
await page.getByRole('button',{name:'Saturday, September 5, 2026'}).click();
//await page.getByRole('button', { name: /Saturday, Sep(tember)? 5/i }).click();
//await page.keyboard.press('Enter')
await page.waitForTimeout(2000);
await page.screenshot({path:'image/screenshot4.png'})
})