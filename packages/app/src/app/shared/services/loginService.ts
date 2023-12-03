// services/authService.ts
import { urlServer } from '../config/config';

export const login = async (
  email: string,
  password: string
): Promise<Response> => {
  try {
    const response = await fetch(`${urlServer.url}api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return response.json().then((error) => error);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const loginWithToken = async (token: string): Promise<Response> => {
  try {
    // Make a request to your server to validate the token and get user information
    // Adjust the endpoint and headers based on your server's requirements
    const response = await fetch(`${urlServer.url}api/v1/auth/sign-in-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token,
      }),
    });

    if (!response.ok) {
      throw new Error('Login with token failed');
    }

    return response;
  } catch (error) {
    throw new Error('Login with token failed');
  }
};
