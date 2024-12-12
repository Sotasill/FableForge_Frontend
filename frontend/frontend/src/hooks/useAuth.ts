import { useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { username: string };
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  const login = useCallback((username: string, password: string) => {
    // Здесь будет логика авторизации
    setAuth({ isAuthenticated: true, user: { username } });
  }, []);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, user: null });
  }, []);

  return { auth, login, logout };
}; 