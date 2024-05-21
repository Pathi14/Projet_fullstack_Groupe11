import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../graphql/mutations';
import '../styles/login.scss';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn.token);
      navigate('/feed');
      window.alert('Login successful!');
    },
    onError: (error) => {
      console.error(`Login failed: ${error.message}`);
    }
  });

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await login({ variables: { username, password } });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    
    <div className="form-container">
      <Header/>
      <form className="login-form" onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>Log In</button>
        {error && <p>Error: {error.message}</p>}
      </form>
      <Footer/>
    </div>
  );
};

export default Login;

