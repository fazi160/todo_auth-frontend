import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import Login from './components/login/login';
import Register from './components/register/register';
import Admin from './components/admin/admin';
import { PrivateRoute } from './components/PrivateRoute';
import Profile from './components/profile/profile';

function App() {
  return (
    <div>
      
      
      <BrowserRouter> {/* Wrap your Routes with BrowserRouter */}
        <Routes>
          <Route element={<PrivateRoute />} path="/" /> {/* Use 'element' prop */}
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
