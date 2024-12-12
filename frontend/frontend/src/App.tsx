import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/Home/HomePage';
import About from './pages/About/About';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App; 