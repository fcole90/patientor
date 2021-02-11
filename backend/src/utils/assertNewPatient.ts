import { Gender, NewPatient, Entry } from '../types';
import { assertIsString, AssertionError, assertIsDateString } from './BasicTypesAssertions';


const isGender = (x: unknown): x is Gender => {
  return Object.values(Gender).includes(x as Gender);
};

const assertIsGender = (x: unknown): Gender => {
  if (!isGender(x)) {throw new AssertionError(`${x as string} is not a Gender`);}
  return x; 
};

const isEntry = (x: unknown): x is Entry => {
  if (!x) {return false;}
  return true;
};

const assertIsEntry = (x: unknown): Entry => {
  if (!isEntry(x)) {throw new AssertionError(`${x as string} is not an Entry`);}
  return x; 
};

const assertNewPatient = (x: unknown): NewPatient  => {
  const object = x as NewPatient;
  return {
    name: assertIsString(object.name),
    dateOfBirth: assertIsDateString(object.dateOfBirth),
    ssn: assertIsString(object.ssn),
    gender: assertIsGender(object.gender),
    occupation: assertIsString(object.occupation),
    entries: object.entries === undefined ? [] 
    : object.entries.map(entry => assertIsEntry(entry))
  };
};

export default assertNewPatient;
