import { api } from './../app/api';

export const fetchCategories = async () => {
  try {
    const { data } = await api.get('/category');
    return data;
  } catch (err) {
    console.error(err);
  }
};
