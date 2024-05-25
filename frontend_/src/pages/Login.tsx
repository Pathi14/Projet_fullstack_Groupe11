// src/pages/Login.tsx
import React from 'react';
import SignIn from '../components/SignIn';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login: React.FC = () => (
  <div>
    <Header />
    <SignIn />
    <Footer />
  </div>
);

export default Login;
