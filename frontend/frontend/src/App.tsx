import React from 'react';
import { AuthProvider } from './store/AuthContext';
import Layout from './components/Layout/Layout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  );
};

export default App; 