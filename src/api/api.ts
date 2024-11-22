import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

const getToken = () => {
  return localStorage.getItem('accessToken');
};

interface CustomAxiosRequestConfig {
  params?: object;
  headers?: object;
}

export const getRequest = async (url: string, params: object = {}) => {
  const token = getToken();
  const config: CustomAxiosRequestConfig = {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  };
  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw new Error('API 요청 실패');
  }
};

export const postRequest = async (url: string, data: object, params: object = {}) => {
  const token = getToken();
  const config: CustomAxiosRequestConfig = {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : {} // 토큰이 있으면 헤더에 추가
  };

  try {
    const response = await instance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw new Error('API 요청 실패');
  }
};
