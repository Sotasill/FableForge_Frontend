import React from 'react';
import styles from './Auth.module.css';

const SignUp: React.FC = () => {
  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Username" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp; 