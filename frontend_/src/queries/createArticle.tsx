// src/queries/createArticle.tsx
import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $description: String!) {
    createArticle(title: $title, description: $description) {
      code
      success
      message
      article {
        id
        title
        description
        user {
          id
          username
        }
      }
    }
  }
`;
