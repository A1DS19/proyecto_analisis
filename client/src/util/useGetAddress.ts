import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ubicaciones.paginasweb.cr',
  method: 'GET',
  headers: {},
});

export const getProvincias = async () => {
  try {
    const { data } = await api.get('/provincias.json');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getCantones = async (idProvincia: string) => {
  try {
    const { data } = await api.get(`/provincia/${idProvincia}/cantones.json`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getDistritos = async (idProvincia: string, idCanton: string) => {
  try {
    const { data } = await api.get(
      `/provincia/${idProvincia}/canton/${idCanton}/distritos.json`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};
