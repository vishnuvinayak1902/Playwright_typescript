import xlsx from 'xlsx';

export interface ExcelData {
    name: string;
    email:string;
    phonenumber:string;
    address:string;

}

export function gettestdata(sheetName:string): ExcelData[]{

    const workbook = xlsx.readFile('data/testdata.xlsx');

    const worksheet = workbook.Sheets[sheetName];

    return xlsx.utils.sheet_to_json<ExcelData>(worksheet);
}