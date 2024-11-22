import type { AxiosResponse } from 'axios';
import { postRequest } from './api';

// POST 요청을 처리하는 함수 (자세한 구현은 아래 참조)

export const signIn = async (email: string, password: string) => {
  try {
    const response: AxiosResponse<any> = await postRequest('http://15.165.57.191/auth/signIn', {
      email,
      password
    });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('로그인 실패');
  }
};
