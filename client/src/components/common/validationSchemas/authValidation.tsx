import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  name: Yup.string().required('Debe ingresar su primer nombre'),
  lastName: Yup.string().required('Debe ingresar su primer apellido'),
  phoneNumber: Yup.string()
    .required('Debe ingresar su número telefónico')
    .matches(/^[0-9]+$/, 'Número telefónico invalido')
    .min(8, 'Número telefónico invalido')
    .max(8, 'Número telefónico invalido'),
  idNumber: Yup.string()
    .required('Debe ingresar su número de cédula')
    .matches(/^[0-9]+$/, 'Número de cédula invalido')
    .min(9, 'Número de cédula invalido')
    .max(9, 'Número de cédula invalido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Mínimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Mínimo 5 caracteres'),
});

export const requestPasswordReset = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
});

export const passwordReset = Yup.object({
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Mínimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Mínimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

export const updateUserValidationSchema = Yup.object({
  name: Yup.string().required('Debe ingresar su primer nombre'),
  lastName: Yup.string().required('Debe ingresar su primer apellido'),
  phoneNumber: Yup.string()
    .required('Debe ingresar su número telefónico')
    .matches(/^[0-9]+$/, 'Número telefónico invalido')
    .min(8, 'Número telefónico invalido')
    .max(8, 'Número telefónico invalido'),
  idNumber: Yup.string()
    .required('Debe ingresar su número de cédula')
    .matches(/^[0-9]+$/, 'Número de cédula invalido')
    .min(9, 'Número de cédula invalido')
    .max(9, 'Número de cédula invalido'),
});

export const addUpdateValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  name: Yup.string().required('Debe ingresar su primer nombre'),
  lastName: Yup.string().required('Debe ingresar su primer apellido'),
  phoneNumber: Yup.string()
    .required('Debe ingresar su número telefónico')
    .matches(/^[0-9]+$/, 'Número telefónico invalido')
    .min(8, 'Número telefónico invalido')
    .max(8, 'Número telefónico invalido'),
  idNumber: Yup.string()
    .required('Debe ingresar su número de cédula')
    .matches(/^[0-9]+$/, 'Número de cédula invalido')
    .min(9, 'Número de cédula invalido')
    .max(9, 'Número de cédula invalido'),
});
