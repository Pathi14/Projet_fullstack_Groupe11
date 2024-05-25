// src/queries/unlikeComment.tsx
import { gql } from '@apollo/client';

export const UNLIKE_COMMENT = gql`
  mutation UnlikeComment($commentId: ID!) {
    unlikeComment(commentId: $commentId) {
      code
      success
      message
    }
  }
`;

