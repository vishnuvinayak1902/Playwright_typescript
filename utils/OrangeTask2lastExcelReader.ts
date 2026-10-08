import xlsx from 'xlsx';
import path from 'path';

// Excel file that holds the test data for the "last orange task".
// Resolved against this file's folder so it works regardless of cwd.
const filePath = path.resolve(__dirname, '..', 'Data', 'OrangeTask2last.xlsx');

export interface OrangeCredentials {
  UserName: string;
  PassWord: string;
}

export interface OrangeMyInfoData {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  EmployeeID: string;
  OtherId: string;
  DriversLicenseNumber: string;
  Licenseexpirydate: string;
  Nationality: string;
  'Marital Status': string;
}

function readSheet<T>(sheetName: string): T[] {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in Data/OrangeTask2last.xlsx`);
  }
  // raw:false -> formatted text (dates stay as strings); defval:'' -> never undefined
  return xlsx.utils.sheet_to_json<T>(worksheet, { raw: false, defval: '' });
}

export function getOrangeTask2lastCredentials(): OrangeCredentials[] {
  return readSheet<OrangeCredentials>('Credentials');
}

export function getOrangeTask2lastMyInfo(): OrangeMyInfoData[] {
  return readSheet<OrangeMyInfoData>('My Info');
}
