// src/queries/createComment.tsx
import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($articleId: ID!, $content: String!) {
    createComment(articleId: $articleId, content: $content) {
      code
      success
      message
      comment {
        id
        content
        user {
          id
          username
        }
        article {
          id
          title
        }
      }
    }
  }
`;
