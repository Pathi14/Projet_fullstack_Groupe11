import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.scss';
import logo from '../images/logo.png';

const Header: React.FC = () => {
  const navigate = useNavigate(); 

  const goToLogin = () => {
    navigate('/login'); 
  };

  const goToSignup = () => {
    navigate('/signup'); 
  };
  const goToHome = () => {
    navigate('/');
  };

  return (
    <header className="app-header">
      <img src={logo} alt="ConnectSphere Logo" className="logo" onClick={goToHome} />
      <nav className="navigation">
        <button className="btn login" onClick={goToLogin}>Log In</button>
        <button className="btn signup" onClick={goToSignup}>Sign Up</button>
      </nav>
    </header>
  );
};

export default Header;
