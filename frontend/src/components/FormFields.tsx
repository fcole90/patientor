import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { Diagnosis, Gender, Entry } from '../types';


// --- Generic ---
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps<T extends SelectOption> {
  name: string;
  label: string;
  options: T[];
}


export const SelectField = <T extends SelectOption, >({
  name,
  label,
  options,
}: SelectFieldProps<T>) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown"  >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

// -------------


// Gender
export interface GenderOption extends SelectOption {
  value: Gender;
}

export const GenderSelectField: React.FC<SelectFieldProps<GenderOption>> = (props) => (
  SelectField<GenderOption>(props)
);
// -------------



// Entry['type']
export interface EntryTypeOption extends SelectOption {
  value: Entry['type'];
}

export const EntryTypeSelectField: React.FC<SelectFieldProps<EntryTypeOption>> = (props) => (
  SelectField<EntryTypeOption>(props)
);
// -------------



interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface TextFieldManagedProps extends FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
}

export const TextFieldManaged: React.FC<TextFieldManagedProps> = ({
  field,
  label,
  placeholder,
  value,
  onChange
}) => (
  <Form.Field>
  <label>{label}</label>
  <input type='text' placeholder={placeholder} value={value} onChange={onChange}/>
  <div style={{ color:'red' }}>
    <ErrorMessage name={field.name} />
  </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
