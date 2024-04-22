import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from "./resolvers.js";
import { TrackAPI } from "./datasources/TrackAPI.js";
import { typeDefs } from "./schema.js";
import { GhibliAPI } from "./datasources/GhibliAPI.js";
import { getUser } from "./modules/auth.js";
import db from './datasources/db.js'

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req}) => {
    const {cache} = server
    const token = (req.headers.authorization)?.split('Bearer ')?.[1]
    const user = token ? getUser(token) : null
    return {
      dataSources: {
        trackAPI: new TrackAPI({cache}),
        ghibliAPI: new GhibliAPI({cache}),
        db
      },
      user
    }
  }
})

console.log(`🚀  Server ready at: ${url}`)