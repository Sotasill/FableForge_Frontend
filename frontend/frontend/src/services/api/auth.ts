import { axiosInstance } from './axios';

export interface LoginResponse {
  success: boolean;
  token?: string;
  username?: string;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data } = await axiosInstance.post('/auth/login', { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Ошибка входа'
      };
    }
  },

  async register(username: string, email: string, password: string): Promise<RegisterResponse> {
    try {
      const { data } = await axiosInstance.post('/auth/register', {
        username,
        email,
        password
      });
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Ошибка регистрации'
      };
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    await axiosInstance.post('/auth/logout');
  }
}; 