import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

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

export const postRequest = async (url: string, data: object) => {
  const token = getToken();
  const config: CustomAxiosRequestConfig = {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  };
  try {
    const response = await instance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error('API 요청 실패');
  }
};
