import axios, { type InternalAxiosRequestConfig } from 'axios';
import https from 'https';
import useStore from '@/store/store';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data
    });
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => res,
  async err => {
    console.error('Response error:', err);
    const request = err.config;
    if (err.response?.status === 401 && !request._retry) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const refreshInstance = axios.create({
          baseURL: `${BASE_URL}`,
          withCredentials: true
        });

        try {
          const response = await refreshInstance.post('/auth/refresh', {}, { withCredentials: true });

          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          request.headers['Authorization'] = `Bearer ${newAccessToken}`;
          request._retry = true;
          return instance(request);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          const { logout } = useStore.getState();
          logout();
          window.location.href = '/';
        }
      } else {
        const { logout } = useStore.getState();
        logout();
        window.location.href = '/';
      }
    }
    return Promise.reject(err);
  }
);

interface CustomAxiosRequestConfig {
  params?: object;
}

export async function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = params;
  return instance.get(url, config);
}
export async function postRequest(url: string, body: object = {}) {
  return instance.post(url, body);
}

export async function patchRequest(url: string, body: object = {}) {
  return instance.patch(url, body);
}

export async function deleteRequest(url: string) {
  return instance.delete(url);
}

export async function putRequest(url: string, data: Blob | File, headers: Record<string, string> = {}): Promise<any> {
  try {
    const response = await axios.put(url, data, {
      headers: {
        ...headers,
        'Content-Type': data.type || 'application/octet-stream'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
