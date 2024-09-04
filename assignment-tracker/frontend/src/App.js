import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import {createRoot } from 'react-dom/client';
//import { provider } from 'react-redux';
//import HomePage from './pages/HomePage';
//import LogInPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage'
//import ProfilePage from './pages/ProfilePage';
//import ApiDocs from "./components/ApiDocs";





const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            {/*<Route path="/" element={<HomePage />} />*/}
            {/*<Route path="/login" element={<LogInPage  />} /> */}
            {/*<Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="/register" element={<RegistrationPage />} />
            {/*<Route path="/api" element={<ApiDocs />} /> */}
            
          </Routes>
      </BrowserRouter>  
  );
}

export default App;