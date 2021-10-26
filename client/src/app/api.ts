import axios from 'axios';

//'https://60de1d61878c890017fa2daa.mockapi.io'

export const delay = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://morning-cliffs-24291.herokuapp.com/',
});
