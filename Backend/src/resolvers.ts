import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/createUser.js";
import { signIn } from "./mutations/signIn.js";

export const resolvers: Resolvers = {
  Query: {
    divide: (parent, {number1, number2}, context, info) => {
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, {number1, number2}, context, info) => number1 * number2,
    closestColor: (parent, {hexa}) => {
      if(!hexa.match(/^#[0-9a-fA-F]{6}/)) {
        throw new GraphQLError(`${hexa} does not match a color pattern`)
      }
      return getClosestColor(hexa, ["#FF5733", "#33FF57", "#3357FF"])
    },
    getTracks: (_, __, {dataSources}) => {
      return dataSources.trackAPI.getTracks()
    },
    getFilms: (_, __, {dataSources}) => dataSources.ghibliAPI.getFilms(),
    getPeople: (_, __, {dataSources}) => dataSources.ghibliAPI.getPeople(),
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
    signIn: signIn
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