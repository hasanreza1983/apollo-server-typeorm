import * as express from "express"
import * as bodyParser from "body-parser"
import { createConnection } from "typeorm"
import "reflect-metadata";


import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import schema from "./graphql"

const PORT = 3000

const app = express()

createConnection().then(async connection => {
  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema: schema })
  )
  app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })) // if you want GraphiQL enabled
  
  app.listen(PORT)

  console.log("Express application is up and running on port 3000")
})
