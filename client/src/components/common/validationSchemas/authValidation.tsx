import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  name: Yup.string().required('Debe ingresar su primer nombre'),
  lastName: Yup.string().required('Debe ingresar su primer apellido'),
  phoneNumber: Yup.string()
    .required('Debe ingresar su numero telefonico')
    .matches(/^[0-9]+$/, 'Numero telefonico invalido')
    .min(8, 'Numero telefonico invalido')
    .max(8, 'Numero telefonico invalido'),
  idNumber: Yup.string()
    .required('Debe ingresar su numero de cedula')
    .matches(/^[0-9]+$/, 'Numero de cedula invalido')
    .min(9, 'Numero de cedula invalido')
    .max(9, 'Numero de cedula invalido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Minimo 5 caracteres'),
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
    .min(5, 'Minimo 5 caracteres'),
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
    .min(5, 'Minimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Minimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

export const updateUserValidationSchema = Yup.object({
  name: Yup.string().required('Debe ingresar su primer nombre'),
  lastName: Yup.string().required('Debe ingresar su primer apellido'),
  phoneNumber: Yup.string()
    .required('Debe ingresar su numero telefonico')
    .matches(/^[0-9]+$/, 'Numero telefonico invalido')
    .min(8, 'Numero telefonico invalido')
    .max(8, 'Numero telefonico invalido'),
  idNumber: Yup.string()
    .required('Debe ingresar su numero de cedula')
    .matches(/^[0-9]+$/, 'Numero de cedula invalido')
    .min(9, 'Numero de cedula invalido')
    .max(9, 'Numero de cedula invalido'),
});

export const addUpdateValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  name: Yup.string().required('Debe ingresar su primer nombre'),
  lastName: Yup.string().required('Debe ingresar su primer apellido'),
  phoneNumber: Yup.string()
    .required('Debe ingresar su numero telefonico')
    .matches(/^[0-9]+$/, 'Numero telefonico invalido')
    .min(8, 'Numero telefonico invalido')
    .max(8, 'Numero telefonico invalido'),
  idNumber: Yup.string()
    .required('Debe ingresar su numero de cedula')
    .matches(/^[0-9]+$/, 'Numero de cedula invalido')
    .min(9, 'Numero de cedula invalido')
    .max(9, 'Numero de cedula invalido'),
});
