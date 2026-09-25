import xlsx from 'xlsx';

export interface ExcelData1 {
    FirstName: string;
    MiddleName :string;
    LastName:string;
    EmployeeID:string;
    OtherId:string;
    DriversLicenseNumber:string;
    Licenseexpirydate:string;
    Nationality:string;
    address:string;

}

export function gettestdata(sheetName:string): ExcelData1[]{

    const workbook = xlsx.readFile('data/testdata.xlsx'); 

    const worksheet = workbook.Sheets[sheetName];

    return xlsx.utils.sheet_to_json<ExcelData1>(worksheet);
}