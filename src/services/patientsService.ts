import patientsData from '../../data/patients';
import { Entry, Patient, NewPatient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { assertIsString } from '../utils/BasicTypesAssertions';
import assertNewPatient from '../utils/assertNewPatient';
import { assertNewEntry } from '../utils/assertNewEntry';

const patients: Array<Patient> = patientsData ;

const toPublicPatient = ({ 
  ssn: _ssn, 
  entries: _entries,
   ...publicPatient }: Patient): PublicPatient => (publicPatient);

const getPatients = (): Array<Patient> => {
  return patients;
};

const getOnePatient = (id: string): Patient => {
  assertIsString(id);
  const patient = patients.find(patient => patient.id == id);
  if (!patient) {
    throw new Error(`Could not find any patient with id ${id}`);
  }
  return patient;
};

const getPublicPatients = (): PublicPatient[] => {
  return getPatients().map(patient => toPublicPatient(patient));
};

const addPatient = (newPatient: NewPatient): PublicPatient  => {
  const addedPatient: Patient = {
    id: uuid(),
    ...assertNewPatient(newPatient)
  };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntryToPatient = (patientId: Patient['id'], newEntry: unknown): Patient => {
  const patient = getOnePatient(patientId);
  const entry: Entry = {
    id: uuid(),
    ...assertNewEntry(newEntry)
  };
  patient.entries = [...patient.entries, entry];
  return patient;
};

export default {
  getPatients,
  getOnePatient,
  getPublicPatients,
  addPatient,
  addEntryToPatient
};
