import { postRequest } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

export const signIn = async (credentials: LoginCredentials) => {
  const url = 'http://15.165.57.191/auth/signIn';

  try {
    const response = await postRequest(url, credentials);

    if (!response.accessToken || !response.role) {
      throw new Error('Invalid API response: Missing required fields');
    }

    localStorage.setItem('accessToken', response.accessToken);
    console.log('토큰토큰토큰: ', localStorage.getItem('accessToken'));

    return response;
  } catch (error) {
    console.error('Error in signIn:', error);
    throw new Error('Login failed');
  }
};
