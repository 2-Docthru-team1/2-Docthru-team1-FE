import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

interface CustomAxiosRequestConfig {
  params?: object;
}

export async function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = {
    params
  };
  try {
    return instance.get(url, config);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error');
    }
    throw error;
  }
}
