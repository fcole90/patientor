import { Entry, NewEntry, Diagnosis, BaseEntry, HealthCheckEntry,
   HealthCheckRating, HospitalEntry, Discharge, 
   OccupationalHealthcareEntry, SickLeave, UnionOmit } from '../types';
import { assertNotNone, assertIsString, assertIsDateString, assertIsArray, 
  isString, AssertionError, assertNever, assertIsNumber, isNumber } from './BasicTypesAssertions';

export const assertDiagnosis = (x: unknown): Diagnosis => {
  const object = assertNotNone(x, 'diagnosis') as Diagnosis;
  return {
    code: assertIsString(object.code),
    name: assertIsString(object.name),
    latin: object.latin === undefined ? undefined : assertIsString(object.latin),
  };
};

const isEntryType = (x: unknown): x is Entry['type'] => (
  isString(x) && ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(x)
);

const assertIsEntryType = (x: unknown): Entry['type'] => {
  if (!isEntryType(x)) { throw new AssertionError(`${x as string} is not an Entry['type']`); }
  return x;
};


const assertBaseEntry = (x: unknown): UnionOmit<BaseEntry, 'id'>  => {
  const object = assertNotNone(x, 'Entry') as BaseEntry;
  return {
    description: assertIsString(object.description),
    date: assertIsDateString(object.date),
    specialist: assertIsString(object.specialist),
    diagnosisCodes: object.diagnosisCodes  === undefined ? undefined :
      assertIsArray(object.diagnosisCodes).map(code => assertIsString(code))
  };
};


const assertHealthCheckRating = (x: unknown): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).filter(isNumber).includes(assertIsNumber(x))) {
    throw new AssertionError(`${x as string} is not an HealthCheckRating value: ${Object.values(HealthCheckRating).join(' | ')}`);
  }
  return x as HealthCheckRating;
};

const assertHealthCheckEntry = (x: unknown): UnionOmit<HealthCheckEntry, 'id'>  => {
  const object = assertNotNone(x, 'Entry') as HealthCheckEntry;
  return {
    ...assertBaseEntry(object),
    type: "HealthCheck",
    healthCheckRating: assertHealthCheckRating(object.healthCheckRating)
  };
};

const assertDischarge = (x: unknown): Discharge => {
  const object = assertNotNone(x, 'discharge') as Discharge;
  return {
    date: assertIsDateString(object.date),
    criteria: assertIsString(object.criteria)
  };
};

const assertHospitalEntry = (x: unknown): UnionOmit<HospitalEntry, 'id'>  => {
  const object = assertNotNone(x, 'Entry') as HospitalEntry;
  return {
    ...assertBaseEntry(object),
    type: "Hospital",
    discharge: assertDischarge(object.discharge)
  };
};

const assertSickLeave = (x: unknown): SickLeave => {
  const object = assertNotNone(x, 'sickleave') as SickLeave;
  return {
    startDate: assertIsDateString(object.startDate),
    endDate: assertIsDateString(object.endDate)
  };
};

const assertOccupationalHealthcare = (x: unknown): UnionOmit<OccupationalHealthcareEntry, 'id'>  => {
  const object = assertNotNone(x, 'Entry') as OccupationalHealthcareEntry;
  return {
    ...assertBaseEntry(object),
    type: "OccupationalHealthcare",
    employerName: assertIsString(object.employerName),
    sickLeave: object.sickLeave === undefined ? undefined
      : assertSickLeave(object.sickLeave)
  };
};

export const assertNewEntry = (x: unknown): NewEntry  => {
  const object = assertNotNone(x, 'Entry') as Entry;
  assertIsEntryType(object.type);
  switch (object.type) {
    case "HealthCheck":
      assertHealthCheckEntry(object);
      const entry: HealthCheckEntry = {
        ...object,
        type: 'HealthCheck',
        healthCheckRating: object.healthCheckRating
      };
      return entry;
    case "OccupationalHealthcare":
      return assertOccupationalHealthcare(object);
    case "Hospital":
      return assertHospitalEntry(object);
    default:
      return assertNever(object);    
  }
};