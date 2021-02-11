import { State } from './state';
import { Patient, Diagnosis } from '../types';

export const setPatientList = (patientListFromApi: Patient[]): Action => ({ 
  type: 'SET_PATIENT_LIST', 
  payload: patientListFromApi 
});

export const setDiagnosesList = (diagnosesListFromApi: Diagnosis[]): Action => ({ 
  type: 'SET_DIAGNOSES_LIST', 
  payload: diagnosesListFromApi 
});

export const addPatient = (patient: Patient): Action => ({ 
  type: 'ADD_PATIENT',
  payload: patient
});

export const updatePatient = (patient: Patient): Action => ({ 
  type: 'UPDATE_PATIENT',
  payload: patient
});

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT' | 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST'; 
      payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'SET_PATIENT_LIST':
    return {
      ...state,
      patients: {
        ...action.payload.reduce(
          (otherPatients, patient) => ({ ...otherPatients, [patient.id]: patient }),
          {}
        ),
        ...state.patients
      }
    };
  case 'SET_DIAGNOSES_LIST':
    return {
      ...state,
      diagnoses: {
        ...action.payload.reduce(
          (otherDiagnoses, diagnosis) => ({ ...otherDiagnoses, [diagnosis.code]: diagnosis }),
          {}
        ),
        ...state.diagnoses
      }
    };
  case 'ADD_PATIENT':
  case 'UPDATE_PATIENT':
    return {
      ...state,
      patients: {
        ...state.patients,
        [action.payload.id]: action.payload
      }
    };
  default:
    return state;
  }
};
