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
import { DataSourceContext } from "./context.js";
const prisma = new PrismaClient();


export const resolvers: Resolvers = {
  Query: {
    getAllArticles: async (_, __, { dataSources }: DataSourceContext) => {
      const articles = await dataSources.db.article.findMany({
        include: {
          user: true,
          comment: {
            include: {
              user: true,
            },
          },
        },
      });

      return articles;
    },
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