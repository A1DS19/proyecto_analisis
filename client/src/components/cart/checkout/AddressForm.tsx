import { ErrorMessage, FormikProps } from 'formik';
import { Order } from '../../../app/user/types';
import { getCantones, getDistritos, getProvincias } from '../../../util/useGetAddress';
import React from 'react';
import { Box, FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react';
import { ErrorMessageForm } from '../../common/ErrorMessageForm';

interface AddressFormProps {
  props: FormikProps<Order>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ props }): JSX.Element => {
  const [provincias, setProvincias] = React.useState({});
  const [cantones, setCantones] = React.useState({});
  const [distritos, setDistritos] = React.useState({});

  const [provincia, setProvincia] = React.useState('');
  const [canton, setCanton] = React.useState('');
  const [distrito, setDistrito] = React.useState('');

  React.useEffect(() => {
    (async () => {
      setProvincias(await getProvincias());
    })();
  }, []);

  const handleCanton = async (idProvincia: string) => {
    setCantones(await getCantones(idProvincia));
    setProvincia(idProvincia);
  };

  const handleDistrito = async (idCanton: string) => {
    setDistritos(await getDistritos(provincia, idCanton));
    setCanton(idCanton);
  };

  return (
    <Box my={2}>
      <FormControl mb={1}>
        <FormLabel>Provincia</FormLabel>
        <Select
          placeholder='Provincia'
          name='address.provincia'
          onChange={async (e) => {
            const index = e.target.value;
            props.setFieldValue('address.provincia', (provincias as any)[index]);
            await handleCanton(e.target.value);
          }}
          onBlur={props.handleBlur}
        >
          {Object.entries(provincias).map(([key, provincia]) => (
            <option key={key} value={key}>
              {provincia as string}
            </option>
          ))}
        </Select>
        <ErrorMessage name='address.provincia' component={ErrorMessageForm} />
      </FormControl>

      {provincia && (
        <FormControl my={1}>
          <FormLabel>Canton</FormLabel>
          <Select
            placeholder='Canton'
            name='address.canton'
            onChange={async (e) => {
              const index = e.target.value;
              props.setFieldValue('address.canton', (cantones as any)[index]);
              await handleDistrito(e.target.value);
            }}
            onBlur={props.handleBlur}
          >
            {Object.entries(cantones).map(([key, provincia]) => (
              <option key={key} value={key}>
                {provincia as string}
              </option>
            ))}
          </Select>
          <ErrorMessage name='address.canton' component={ErrorMessageForm} />
        </FormControl>
      )}

      {canton && (
        <FormControl my={1}>
          <FormLabel>Distrito</FormLabel>
          <Select
            placeholder='Distrito'
            name='address.distrito'
            onChange={(e) => {
              setDistrito(e.target.value);
              const index = e.target.value;
              props.setFieldValue('address.distrito', (distritos as any)[index]);
            }}
            onBlur={props.handleBlur}
          >
            {Object.entries(distritos).map(([key, provincia]) => (
              <option key={key} value={key}>
                {provincia as string}
              </option>
            ))}
          </Select>
          <ErrorMessage name='address.distrito' component={ErrorMessageForm} />
        </FormControl>
      )}

      {distrito && (
        <FormControl my={1}>
          <FormLabel>Direccion exacta</FormLabel>
          <Textarea
            placeholder='Direccion'
            name='address.direccionExacta'
            onChange={(e) => {
              props.handleChange(e);
            }}
            onBlur={props.handleBlur}
          />
          <ErrorMessage name='address.direccionExacta' component={ErrorMessageForm} />
        </FormControl>
      )}
    </Box>
  );
};
