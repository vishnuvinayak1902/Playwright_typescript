import codegenData from './codegentestdata.json';

export interface Credentials {
  username: string;
  password: string;
}

export interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  otherId: string;
  driversLicense: string;
}

export interface CodegenTestData {
  credentials: Credentials;
  personalDetails: PersonalDetails;
}

export const codegenTestData: CodegenTestData = codegenData;
