import type { AxiosResponse } from 'axios';
import { postRequest } from './api';

// POST 요청을 처리하는 함수 (자세한 구현은 아래 참조)

export const signIn = async (email: string, password: string) => {
  try {
    const response: AxiosResponse<any> = await postRequest('http://15.165.57.191/auth/signIn', {
      email,
      password
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('An error occurred during login.');
  }
};
