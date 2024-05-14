import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/createUser.js";
import { signIn } from "./mutations/signIn.js";
import { createArticle } from "./mutations/createArticle.js";
import { createComment } from "./mutations/createComment.js";
import { PrismaClient } from '@prisma/client';
import { likeComment } from "./mutations/likeComment.js";
import { likeArticle } from "./mutations/likeArticle.js";
import { unlikeArticle } from "./mutations/unlikeArticle.js";
import { unlikeComment } from "./mutations/unlikeComment.js";
const prisma = new PrismaClient();


export const resolvers: Resolvers = {
  Query: {
    divide: (parent, {number1, number2}, context, info) => {
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, {number1, number2}, context, info) => number1 * number2,
  },
  Mutation: {
    createUser: createUser,
    signIn: signIn,
    createArticle: createArticle,
    createComment: createComment,
    likeArticle: likeArticle,
    likeComment: likeComment,
    unlikeArticle: unlikeArticle,
    unlikeComment: unlikeComment,
  }
}