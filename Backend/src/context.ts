import { PrismaClient } from "@prisma/client"
import { GhibliAPI } from "./datasources/GhibliAPI"
import { TrackAPI } from "./datasources/TrackAPI"
import { JWTUser } from "./modules/auth"

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI,
    ghibliAPI: GhibliAPI,
    db: PrismaClient 
  }
  user: JWTUser | null
}