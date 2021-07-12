import React from 'react';
import { ErrorMessage } from 'formik';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessageForm } from './ErrorMessageForm';
import { FormikProps } from 'formik';

interface FormFieldProps {
  props: FormikProps<any>;
  name: string;
  formLabel: string;
  placeholder: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  props,
  name,
  formLabel,
  placeholder,
}): JSX.Element => {
  return (
    <FormControl>
      <FormLabel>{formLabel}</FormLabel>
      <Input
        placeholder={placeholder}
        name={name}
        value={props.values.email}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      <ErrorMessage name={name} component={ErrorMessageForm} />
    </FormControl>
  );
};
