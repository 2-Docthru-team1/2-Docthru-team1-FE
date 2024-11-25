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
    throw new Error('Login failed');
  }
};
