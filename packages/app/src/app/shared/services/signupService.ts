// services/authService.ts
import { urlServer } from '../config/config';

export const signup = async (
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  try {
    const response = await fetch(`${urlServer.url}api/v1/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return response;
  } catch (error) {
    throw new Error('Signup failed');
  }
};
