import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-15-165-57-191.ap-northeast-2.compute.amazonaws.com',
  timeout: 10000
});

interface CustomAxiosRequestConfig {
  params?: object;
}

export async function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = {
    params
  };
  return instance.get(url, config);
}

export async function postRequest(url: string, data: object = {}, params: object = {}) {
  const config: CustomAxiosRequestConfig = {
    params
  };
  return instance.post(url, data, config);
}
