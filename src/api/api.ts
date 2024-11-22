import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

interface CustomAxiosRequestConfig {
  params?: object;
  headers?: object;
}

export function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = {
    params
  };

  return instance.get(url, config);
}

export function postRequest(url: string, data: object, params: object = {}) {
  const config: CustomAxiosRequestConfig = {
    params
  };

  return instance.post(url, data, config);
}
