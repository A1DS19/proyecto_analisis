import React from 'react';
import { ErrorMessage } from 'formik';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { ErrorMessageForm } from './ErrorMessageForm';
import { FormikProps } from 'formik';

interface FormSelectProps {
  props: FormikProps<any>;
  name: string;
  formLabel: string;
  placeholder: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  props,
  name,
  formLabel,
  placeholder,
}): JSX.Element => {
  return (
    <FormControl>
      <FormLabel>{formLabel}</FormLabel>
      <Select
        placeholder={placeholder}
        name={name}
        value={props.values}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      <ErrorMessage name={name} component={ErrorMessageForm} />
    </FormControl>
  );
};
