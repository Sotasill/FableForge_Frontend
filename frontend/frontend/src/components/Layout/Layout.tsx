import React, { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 FableForge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
    