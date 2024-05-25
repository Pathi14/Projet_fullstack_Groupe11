import gql from "graphql-tag";

export const typeDefs = gql`

type User {
  id: ID!
  username: String!
  article: [Article]
  comment: [Comment]
}

type Article {
  id: ID!
  title: String!
  description: String!
  user: User
  numberOfLikes: Int
  comment: [Comment]
}

type Comment {
  id: ID!
  content: String!
  article: Article
  user: User
}

type Query {
  getAllArticles: [Article]
}

type Mutation {
  createUser(username: String!, password: String!): CreateUserResponse
  signIn(username: String!, password: String!): SignInResponse
  createArticle(title: String!, description: String!): CreateArticleResponse
  createComment(articleId: ID!, content: String!): CreateCommentResponse
  likeArticle(articleId: ID!): LikeResponse
  likeComment(commentId: ID!): LikeResponse
  unlikeArticle(articleId: ID!): LikeResponse
  unlikeComment(commentId: ID!): LikeResponse
  deleteUser(userId: ID!): DeleteUserResponse
}

type CreateUserResponse {
  code: Int!
  success: Boolean!
  message: String!
  user: User
}

type SignInResponse {
  code: Int!
  success: Boolean!
  message: String!
  token: String
}

type CreateArticleResponse {
  code: Int!
  success: Boolean!
  message: String!
  article: Article
}

type CreateCommentResponse {
  code: Int!
  success: Boolean!
  message: String!
  comment: Comment
}

type LikeResponse {
  code: Int!
  success: Boolean!
  message: String!
  article: Article
}

type DeleteUserResponse {
  code: Int!
  success: Boolean!
  message: String!
}
`