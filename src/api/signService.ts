import { postRequest } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

export const signIn = async (credentials: LoginCredentials) => {
  const url = 'http://15.165.57.191/auth/signIn';

  try {
    const response = await postRequest(url, credentials);

    localStorage.setItem('accessToken', response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
