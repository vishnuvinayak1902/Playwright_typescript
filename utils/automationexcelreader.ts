import  xlsx from 'xlsx';

export interface newlog{
Name:string
Email:string
Password:string
DOB:string
Gender:string
Address:string
Country: string
State:string
City:string
Zipcode	:string
Mobileno:string

}
export function gettestdata(newlogindata:string):newlog[]{

    const workbook=xlsx.readFile('data/automationexe.xlsx')
    const worksheet=workbook.Sheets[newlogindata];
    return xlsx.utils.sheet_to_json<newlog>(worksheet);
}