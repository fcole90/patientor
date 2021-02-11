// ---------------------------------------------------------------------------------------------------------------------------------------
// By: Andrii Dieiev
// From: https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// ---------------------------------------------------------------------------------------------------------------------------------------

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: DateString;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface SickLeave {
  startDate: DateString;
  endDate: DateString;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: DateString;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  TransMale = 'transmale',
  Female = 'female',
  TransFemale = 'transfemale',
  GenderQueer = 'genderqueer',
  Other = 'other',
  Unknown = 'unknown',
}

export type NewPatient = UnionOmit<Patient, 'id'>;

export type PublicPatient = UnionOmit<Patient, 'ssn' | 'entries' >;

export type DateString = string;