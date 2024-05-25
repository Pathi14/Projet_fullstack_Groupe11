import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../queries/signIn';
import { SignInMutation, SignInMutationVariables } from '../generated/graphql';
import { FormContainer, FormField, SubmitButton, ErrorMessage } from '../styles';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signIn, { loading, error }] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await signIn({ variables: { username, password } });
      if (data?.signIn?.token) {
        localStorage.setItem('token', data.signIn.token);
        window.location.href = '/articles'; // Redirection vers la page des articles après la connexion réussie
      } else {
        setErrorMessage('Invalid username or password');
        console.error('Sign in failed: No token received');
      }
    } catch (err) {
      setErrorMessage('Invalid username or password');
      console.error('Sign in error:', err);
    }
  };

  return (
    <>
      <h1>Connexion</h1>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </FormField>
          <FormField>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </FormField>
          <SubmitButton type="submit" disabled={loading}>Se connecter</SubmitButton>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {error && !errorMessage && <ErrorMessage>Error: {error.message}</ErrorMessage>}
        </form>
      </FormContainer>
    </>
  );
};

export default SignIn;
