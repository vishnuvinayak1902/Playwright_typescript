import{test,expect,chromium} from '@playwright/test';
test('keyboard_access',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');
await page.locator('#name').fill('Vishnu Vinayak')
await page.keyboard.press('Tab');
//await page.getByRole('link',{name:'Data Entry Form'}).click();
await page.getByPlaceholder('Enter EMail').fill('VishnuVinayak@gmail.com');
await page.keyboard.press('Tab');
await page.getByRole('textbox',{name:'Enter Phone'}).fill('99999930');
await page.keyboard.press('Tab');
await page.locator('#textarea').fill('cvb')
await page.keyboard.press('Tab');
await page.locator('#male').check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Sunday'}).check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Monday'}).check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Tuesday'}).check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Wednesday'}).check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Thursday'}).check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Friday'}).check();
await page.keyboard.press('Tab');
await page.getByRole('checkbox',{name:'Saturday'}).check();
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
let Country;
//while (Country !== 'India'){
//await page.keyboard.press('ArrowDown');

//await page.keyboard.press('Enter');


//await page.keyboard.press("Tab");
//}
//await page.keyboard.press('Enter');
for(let Country;Country!=='India';);
{
    await page.keyboard.press('arrow down')
    for (let Country2='India';Country2=='India';){
             await page.keyboard.press('Enter');
    }
}
        
   
//if (Country =='India'){
//await page.keyboard.press('Enter');
//}
await page.waitForTimeout(2000);

})
