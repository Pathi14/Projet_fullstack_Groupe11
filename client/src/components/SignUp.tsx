import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../graphql/mutations';  
import '../styles/signup.scss';
import Header from './Header';
import Footer from './Footer';

const SignUp = () => {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [signup, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.createUser.token);
      navigate('/feed');
      window.alert('Signup successful!');
    },
    onError: (error) => {
      console.error(`Signup failed: ${error.message}`);
    }
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await signup({ variables: { username, password } });
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="form-container">
       <Header/>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>Sign Up</button>
        {error && <p>Error: {error.message}</p>}
      </form>
      <Footer/>
    </div>
  );
};

export default SignUp;
