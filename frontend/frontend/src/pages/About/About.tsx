import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>About FableForge</h1>
      <p className={styles.description}>
        Welcome to FableForge, where creativity meets technology.
      </p>
    </div>
  );
};

export default About;
