// src/queries/likeArticle.tsx
import { gql } from '@apollo/client';

export const LIKE_ARTICLE = gql`
  mutation LikeArticle($articleId: ID!) {
    likeArticle(articleId: $articleId) {
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
