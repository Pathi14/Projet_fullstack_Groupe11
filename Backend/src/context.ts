import { PrismaClient } from "@prisma/client"
import { JWTUser } from "./modules/auth"

export type DataSourceContext = {
  dataSources: {
    db: PrismaClient 
  }
  user: JWTUser | null
}