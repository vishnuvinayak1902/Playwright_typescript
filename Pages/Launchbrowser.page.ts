import { Expect, Page } from "@playwright/test"; //1

export class Browserpage{  //3
readonly Page:Page; //3
readonly name:any;  //3  
readonly Email:any; //3
readonly phone:any; //3



constructor(Page:Page){  //2

    this.Page = Page;  //2
    this.name = Page.locator('#name'); //2 Here we are locating 
    this.Email = Page.getByPlaceholder('Enter EMail') //2
    this.phone= Page.getByPlaceholder('Enter Phone') //2

}

async navigate(){ //4 provided the name randomly

    await this.Page.goto('https://testautomationpractice.blogspot.com/') //4 here we r passing the actions

}

async fillname(){

    await this.name.fill('Vishnu')
}

async fillemail(){

    await this.Email.fill('vishnuvinayak1902@gmail.com')
}

async phonenumber(){

await this.phone.fill('8838252551')

}


}
