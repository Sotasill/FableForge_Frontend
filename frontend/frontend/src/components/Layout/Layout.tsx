import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthContext';
import styles from './Layout.module.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>FableForge</Link>
          <div className={styles.links}>
            <Link to="/" className={styles.link}>Главная</Link>
            <Link to="/result/latest" className={styles.link}>Последняя история</Link>
            {auth.isAuthenticated ? (
              <>
                <Link to="/settings" className={styles.link}>Настройки</Link>
                <button onClick={handleLogout} className={styles.button}>Выйти</button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link}>Войти</Link>
                <Link to="/signup" className={styles.link}>Регистрация</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2024 FableForge. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Layout;
    