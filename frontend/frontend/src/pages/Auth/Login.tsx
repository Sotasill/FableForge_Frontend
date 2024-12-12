import React from 'react';
import styles from './Auth.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login; 