import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage';
import AssignmentFormPage from './components/forms/AssignmentFormPage';
import CategoryFormPage from './components/forms/CategoryFormPage';
import DashboardPage from './pages/DashboardPage';
import CategoryPage from './pages/CategoryPage';
//import ApiDocs from "./components/ApiDocs";





const App = () => {
  return (
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage  />} /> 
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />

            <Route path="/assignment" element={<PrivateRoute><AssignmentFormPage /></PrivateRoute>} />
            <Route path="/assignment/create" element={<PrivateRoute><AssignmentFormPage /></PrivateRoute>} />
            <Route path="/assignment/:id/edit" element={<PrivateRoute><AssignmentFormPage /></PrivateRoute>} />
            <Route path="/assignment/:id" element={<PrivateRoute><AssignmentFormPage /></PrivateRoute>} />
            <Route path="/assignment/:id/delete" element={<PrivateRoute><AssignmentFormPage /></PrivateRoute>} />

            <Route path="/category" element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
            <Route path="/category/create" element={<PrivateRoute><CategoryFormPage /></PrivateRoute>} />
            <Route path="/category/:id/edit" element={<PrivateRoute><CategoryFormPage /></PrivateRoute>} />
            <Route path="/category/:id/delete" element={<PrivateRoute><CategoryFormPage /></PrivateRoute>} />

            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            

            <Route path="/register" element={<RegistrationPage />} />

       
            
          </Routes>
      </AuthProvider>
      </BrowserRouter>  
  );
}

export default App;