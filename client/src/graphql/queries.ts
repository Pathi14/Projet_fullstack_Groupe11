import { gql } from '@apollo/client';

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    getAllArticles {
      id
      title
      description
      numberOfLikes
      user {
        id
        username
      }
      comment {
        id
        content
        user {
          id
          username
        }
      }
    }
  }
`;
