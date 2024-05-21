import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
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

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      code
      success
      message
      token
    }
  }
`;

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
        numberOfLikes
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($articleId: ID!, $content: String!) {
    createComment(articleId: $articleId, content: $content) {
      code
      success
      message
      comment {
        id
        content
      }
    }
  }
`;

export const LIKE_ARTICLE = gql`
  mutation LikeArticle($articleId: ID!) {
    likeArticle(articleId: $articleId) {
      code
      success
      message
      article {
        id
        title
        description
        numberOfLikes
      }
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      code
      success
      message
    }
  }
`;

export const UNLIKE_ARTICLE = gql`
  mutation UnlikeArticle($articleId: ID!) {
    unlikeArticle(articleId: $articleId) {
      code
      success
      message
      article {
        id
        title
        description
        numberOfLikes
      }
    }
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation UnlikeComment($commentId: ID!) {
    unlikeComment(commentId: $commentId) {
      code
      success
      message
    }
  }
`;
