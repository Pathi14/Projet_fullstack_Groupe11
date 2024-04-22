import gql from "graphql-tag";

export const typeDefs = gql`
type Track {
  id: ID!
  title: String!
  author: Author!
  thumbnail: String
  numberOfViews: Int
  numberOfLikes: Int
}

type Author {
  id: ID!
  name: String!
  photo: String
}

type Film {
  id: ID!
  title: String
  people: [People]!
}

type People {
  id: ID!
  name: String
  eyeColor: String
  films: [Film]!
}

type Query {
  divide(number1: Int!, number2: Int!): Float
  multiply(number1: Int!, number2: Int!): Float
  closestColor(hexa: String!): String
  getTracks: [Track!]!
  getFilms: [Film]!
  getPeople: [People]!
}

type Mutation {
  incrementTrackViews(id: ID!): IncrementTrackViewsResponse
  incrementLikes(id: ID!): IncrementLikesResponse
  createUser(username: String!, password: String!): CreateUserResponse
  signIn(username: String!, password: String!): SignInResponse
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

type User {
  id: ID!
  username: String!
}

type IncrementTrackViewsResponse {
  code: Int!
  success: Boolean!
  message: String!
  track: Track
}

type IncrementLikesResponse {
  code: Int!
  success: Boolean!
  message: String!
  track: Track
}
`