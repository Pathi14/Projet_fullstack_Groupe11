// src/queries/likeComment.tsx
import { gql } from '@apollo/client';

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      code
      success
      message
    }
  }
`;
