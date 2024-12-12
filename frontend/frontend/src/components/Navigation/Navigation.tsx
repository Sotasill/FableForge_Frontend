import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/">FableForge</Link>
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/signup" className={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navigation; 