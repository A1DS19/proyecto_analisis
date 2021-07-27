import * as Yup from 'yup';

export const createProductValidation = Yup.object({
  name: Yup.string().required('El nombre es requerido').lowercase(),
  category: Yup.string().required('La categoria es requerida').lowercase(),
  description: Yup.string().required('El descripcción es requerida').lowercase(),
  price: Yup.number().required('El precio requerido').min(1, 'El precio minimo es 1'),
  quantity: Yup.number()
    .required('La cantidad es requerida')
    .min(1, 'La cantidad minima es 1'),
  images: Yup.array()
    .required('Debe agregar imagenes')
    .min(1, 'Debe agregar al menos una imagen'),
});

export const categoryValidation = Yup.object({
  name: Yup.string().required('El nombre de la categoria es requerido').lowercase(),
});
