import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validation';
import styles from './Auth.module.css';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateUsername(username)) {
      setError('Имя пользователя должно содержать минимум 3 символа');
      return;
    }

    if (!validateEmail(email)) {
      setError('Неверный формат email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      const response = await api.register(username, email, password);
      if (response.success) {
        navigate('/login');
      } else {
        setError(response.message || 'Ошибка регистрации');
      }
    } catch (err) {
      setError('Ошибка сервера');
    }
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Регистрация</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default SignUp; 