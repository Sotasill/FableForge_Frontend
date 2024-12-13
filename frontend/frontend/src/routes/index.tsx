import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import StoryResultPage from '../pages/StoryResult/StoryResultPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import ProtectedRoute from './ProtectedRoute';
import TestPage from '../pages/TestPage/TestPage';
import ImageTestPage from '../pages/ImageTestPage/ImageTestPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/result/:id" element={<StoryResultPage />} />
      <Route path="/result/latest" element={<Navigate to="/result/1" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/test" element={<TestPage />} />
      <Route path="/image-test" element={<ImageTestPage />} />
    </Routes>
  );
};

export default AppRoutes; 