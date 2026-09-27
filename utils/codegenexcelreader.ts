import xlsx from 'xlsx';

export interface CodegenUser {
  name: string
  loginEmail: string
  loginPassword: string
  signupEmail: string
  password: string
  gender: string
  day: string
  month: string
  year: string
  firstName: string
  lastName: string
  address: string
  state: string
  city: string
  zipcode: string
  mobile: string
}

export function getcodegenuser(sheetname: string): CodegenUser[] {
  const workbook = xlsx.readFile('data/codegenautomation.xlsx')
  const worksheet = workbook.Sheets[sheetname];
  return xlsx.utils.sheet_to_json<CodegenUser>(worksheet, { raw: false, defval: '' });
}
