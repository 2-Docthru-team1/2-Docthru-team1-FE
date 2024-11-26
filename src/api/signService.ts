import { isAxiosError } from 'axios';
import { postRequest } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

export const signIn = async (credentials: LoginCredentials) => {
  const endpoint = '/auth/signIn';

  try {
    const response = await postRequest(endpoint, credentials);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } else {
      console.error('Unknown Error:', error);
    }
    throw new Error('Login failed');
  }
};
