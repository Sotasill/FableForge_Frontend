import { useState, useCallback, useEffect } from 'react';
import { authApi } from '../services/api/auth';
import { useApi } from './useApi';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { username: string };
  loading: boolean;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  const api = useApi();

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    if (response.success && response.username) {
      setAuth({
        isAuthenticated: true,
        user: { username: response.username },
        loading: false
      });
      return true;
    }
    throw new Error(response.message || 'Ошибка входа');
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false
      });
    }
  }, []);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Здесь можно добавить проверку токена на сервере
      setAuth(prev => ({ ...prev, loading: false }));
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return { auth, login, logout };
}; 