import{test,expect,chromium} from'@playwright/test';
test('Iframe',async({page})=>{

     ////// single frame handling
    await page.goto('https://demo.automationtesting.in/Frames.html');
    await page.frameLocator('iframe[name="SingleFrame"]').getByRole('textbox',{name:''}).fill('Vishnu');
    await page.waitForTimeout(2000);    

   //--------

   //Multi frame handling
   await page.getByRole("link",{name:'Iframe with in an Iframe'}).click();
   await page.waitForTimeout(2000); 
//await page.locator('container iframes-page-container')
await page.frameLocator('iframe[src="MultipleFrames.html"]').frameLocator('iframe[src="SingleFrame.html"]').getByRole('textbox',{name:''}).fill('Vishnu')
   //await page.getByRole('heading',{name:'iFrame Demo'}).getByRole('textbox',{name:''}).fill('Vishnu');
   await page.waitForTimeout(2000);

})