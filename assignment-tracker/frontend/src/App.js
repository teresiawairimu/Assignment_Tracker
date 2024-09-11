import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
//import {createRoot } from 'react-dom/client';
//import { provider } from 'react-redux';
//import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage';
import AssignmentFormPage from './pages/AssignmentFormPage';
import CategoryFormPage from './pages/CategoryFormPage';
import DashboardPage from './pages/DashboardPage';
//import ApiDocs from "./components/ApiDocs";





const App = () => {
  return (
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/*<Route path="/" element={<HomePage />} />*/}
            <Route path="/login" element={<LogInPage  />} /> 
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/assignment" element={<PrivateRoute><AssignmentFormPage /></PrivateRoute>} />
            <Route path="/category" element={<PrivateRoute><CategoryFormPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/register" element={<RegistrationPage />} />

            {/*<Route path="/api" element={<ApiDocs />} /> */}
            
          </Routes>
      </AuthProvider>
      </BrowserRouter>  
  );
}

export default App;