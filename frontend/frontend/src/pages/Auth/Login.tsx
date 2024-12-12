import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthContext';
import { api } from '../../services/api';
import { validateEmail, validatePassword } from '../../utils/validation';
import styles from './Auth.module.css';
import { useApi } from '../../hooks/useApi';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const api = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email) || !validatePassword(password)) {
      setError('Проверьте правильность введенных данных');
      return;
    }

    try {
      await api.execute(() => login(email, password));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Вход</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login; 