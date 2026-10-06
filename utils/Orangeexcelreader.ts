import xlsx from 'xlsx';
import path from 'path';

// Works regardless of cwd because we resolve against THIS file's folder: ...
const filePath = path.resolve(__dirname, '..', 'Data', 'testdata.xlsx');

export interface ExcelData1 {
    FirstName: string;
    MiddleName :string;
    LastName:string;
    EmployeeID:string;
    OtherId:string;
    DriversLicenseNumber:string;
    Licenseexpirydate:string;
    Nationality:string;
    'Marital Status': string;
    address?:string;
}

export interface OrangeEmpRegData {
    EmpFirstName: string;
    EmpMiddleName: string;
    EmpLastName: string;
}

export interface OrangeCredentials {
    UserName: string;
    PassWord: string;
}

function readSheet<T>(sheetName: string): T[] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
        throw new Error(`Sheet "${sheetName}" not found in Data/testdata.xlsx`);
    }
    // raw:false -> formatted text (dates stay strings); defval:'' -> no undefined
    return xlsx.utils.sheet_to_json<T>(worksheet, { raw: false, defval: '' });
}

export function gettestdata(sheetName: string): ExcelData1[] {
    return readSheet<ExcelData1>(sheetName);
}

export function getOrangeCredentials(): OrangeCredentials[] {
    return readSheet<OrangeCredentials>('Credentials');
}

export function getOrangeMyInfo(): ExcelData1[] {
    return readSheet<ExcelData1>('My Info');
}

export function getOrangeEmpRegData(): OrangeEmpRegData[] {
    return readSheet<OrangeEmpRegData>('EmpReg');
}