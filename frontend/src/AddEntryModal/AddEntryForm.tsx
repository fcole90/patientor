import React, { useState } from 'react';
import { Grid, Button, Form as UIForm } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, NumberField } from '../components/FormFields';
import { BaseEntry, NewEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry,
        Entry} from '../types';

import { useStateValue } from '../state';

interface Props {
  onSubmit: (data: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: { value: Entry['type']; label: string }[] = [
  { value: "HealthCheck", label: "Health check"},
  { value: "OccupationalHealthcare", label: "Occupational healthcare"},
  { value: "Hospital", label: "Hospital"},
];

export interface EntryFormValues extends 
  Omit<HospitalEntry, 'type'|'id'>, 
  Omit<HealthCheckEntry, 'type'|'id'>, 
  Omit<OccupationalHealthcareEntry, 'type'|'id'> {
    type: Entry['type'] | '';
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [formType, setFormType] = useState<NewEntry['type']>('HealthCheck');

  const baseValues: Omit<BaseEntry, 'id'> = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };

  const healthCheckValues: Omit<HealthCheckEntry, 'id'> = {
    ...baseValues,
    type: 'HealthCheck',
    healthCheckRating: 0
  };

  const hospitalValues: Omit<HospitalEntry, 'id'> = {
    ...baseValues,
    type: 'Hospital',
    discharge: {
      date: '',
      criteria: ''
    }
  };

  const occupationalHealthcareValues: Omit<OccupationalHealthcareEntry, 'id'> = {
    ...baseValues,
    type: 'OccupationalHealthcare',
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    }
  };

  const initialValues: EntryFormValues = {
    ...baseValues,
    ...healthCheckValues,
    ...hospitalValues,
    ...occupationalHealthcareValues,
    type: 'HealthCheck'
  };

  const prepareSubmission = (values: EntryFormValues): EntryFormValues => ({
    ...values,
    sickLeave: (
      values.sickLeave?.startDate !== '' && values.sickLeave?.endDate !== ''
      ) ? values.sickLeave : undefined
  });

  const isValidDate = (x: string): boolean => (
    x.length === 10 && !isNaN(Date.parse(x))
  );

  return (
  <Formik
      initialValues={initialValues}
      onSubmit={(v) => onSubmit(prepareSubmission(v))}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: ({ [subfield: string]: string} | string ) }  = {};

        // Basic mandatory
        if (!values.description) { errors.description = requiredError; }
        if (!values.specialist) { errors.specialist = requiredError; }

        if (!values.date) { errors.date = requiredError; }
        else if (!isValidDate(values.date)) { 
          errors.date = "Wrong format. Use YYYY-MM-DD format"; 
        }
        

        // Specific fields
        switch (formType) {
          case "HealthCheck":
            if (values.healthCheckRating === undefined) { errors.healthCheckRating = requiredError; }
            else if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
              errors.healthCheckRating = "The value must be in range 0-3";
            }
            break;

          case "Hospital":
            if (!values.discharge.criteria) { errors.discharge = { criteria: requiredError }; }
            if (!values.discharge.date) { errors["discharge.date"] = requiredError; }
            else if (!isValidDate(values.discharge.date)) { 
              errors.discharge = { date: "Wrong format. Use YYYY-MM-DD format" };
            }
            break;

          case "OccupationalHealthcare":
            if (!values.employerName) { errors.employerName = requiredError; }
            
            if (values.sickLeave?.startDate && !isValidDate(values.sickLeave.startDate)) { 
              errors.sickLeave = { startDate:"Wrong format. Use YYYY-MM-DD format" }; 
            }

            if (values.sickLeave?.endDate && !isValidDate(values.sickLeave.endDate)) { 
              errors.sickLeave = { endDate:"Wrong format. Use YYYY-MM-DD format" }; 
            }

            break;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <UIForm.Select 
              label="Entry type"
              name="type"
              value={formType}
              onChange={(_event, data) => {
                setFormType(data.value as Entry['type']);
                setFieldTouched('type', true);
                setFieldValue('type', data.value as Entry['type']);
              }}
              options={entryTypeOptions.map(({ value, label: text }) => (
                {key: value, value, text }
              ))}
            />

            <Field
              label="Description"
              placeholder="describe the entry"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name Surname"
              name="specialist"
              component={TextField}
            />
            
            {
              formType === 'HealthCheck' &&
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {
              formType === 'Hospital' &&
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            }

            {
              formType === 'OccupationalHealthcare' &&
              <>
                <Field
                  label="Employer name"
                  placeholder="ACME Inc."
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave (Start Date)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave (End Date)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />        

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );  
};

export default AddEntryForm;