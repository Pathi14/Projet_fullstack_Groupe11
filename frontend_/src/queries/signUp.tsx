// src/queries/signUp.tsx
import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      code
      success
      message
      user {
        id
        username
      }
    }
  }
`;
