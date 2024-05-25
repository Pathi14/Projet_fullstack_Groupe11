// src/queries/unlikeArticle.tsx
import { gql } from '@apollo/client';

export const UNLIKE_ARTICLE = gql`
  mutation UnlikeArticle($articleId: ID!) {
    unlikeArticle(articleId: $articleId) {
      code
      success
      message
      article {
        id
        numberOfLikes
      }
    }
  }
`;
