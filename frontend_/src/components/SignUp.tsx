// src/components/SignUp.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../queries/signUp';
import { SignUpMutation, SignUpMutationVariables } from '../generated/graphql';
import { FormContainer, FormField, SubmitButton, SuccessMessage } from '../styles'; 

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, { data, error }] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await signUp({ variables: { username, password } });
      console.log('Response:', response);
      window.location.href = '/login';
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </FormField>
          <FormField>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </FormField>
          <FormField>
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </FormField>
          <SubmitButton type="submit">S'inscrire</SubmitButton>
        </form>
        {data && data.createUser && (
          <SuccessMessage>Utilisateur inscrit avec succès !</SuccessMessage>
        )}
        {error && <p>Error: {error.message}</p>}
      </FormContainer>
    </>
  );
};

export default SignUp;
