import axios from 'axios';

export const delay = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const api = axios.create({
  baseURL: 'https://60de1d61878c890017fa2daa.mockapi.io',
});
