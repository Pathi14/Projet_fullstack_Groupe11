import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/createUser.js";
import { signIn } from "./mutations/signIn.js";
import { createArticle } from "./mutations/createArticle.js";
import { PrismaClient } from '@prisma/client';
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
    getTracks: (_, __, {dataSources}) => {
      return dataSources.trackAPI.getTracks()
    },
    getFilms: (_, __, {dataSources}) => dataSources.ghibliAPI.getFilms(),
    getPeople: (_, __, {dataSources}) => dataSources.ghibliAPI.getPeople(),
    getUsers: async () => {
      return await prisma.user.findMany({
        include: {
          article: true,
        },
      });
    },
  },
  Mutation: {
    incrementTrackViews: async (_, {id}, {dataSources}) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackView(id);
        return {
          code: 200,
          message: 'Number of views has been incremented',
          success: Boolean(track),
          track
        }
      } catch(e) {
        return {
          code: 304,
          message: 'Resource not modified',
          success: false,
          track: null,
        }
      }
    },
    incrementLikes: async (_, {id}, {dataSources}) => {
      try {
        const track = await dataSources.trackAPI.incrementLikes(id);
        return {
          code: 200,
          message: 'Number of likes has been incremented',
          success: Boolean(track),
          track,
        }
      } catch(e) {
        return {
          code: 304,
          message: 'Resource not modified',
          success: false,
          track: null,
        }
      }
    },
    createUser: createUser,
    signIn: signIn,
    createArticle: createArticle,
  },
  Film: {
    people: ({people}, _, {dataSources}) => {
      return dataSources.ghibliAPI.getPeopleByUrls(people)
    }
  },
  People: {
    eyeColor: ({eye_color}) => eye_color,
    films: ({films}, _, {dataSources}) => {
      return dataSources.ghibliAPI.getFilmsByUrls(films)
    }
  },
  Track: {
    author: (parent, _, {dataSources}) => {
      return dataSources.trackAPI.getAuthorBy(parent.authorId)
    }
  }
}