import "reflect-metadata"
import * as express from "express"
import * as bodyParser from "body-parser"
import { createConnection, getManager } from "typeorm"
import { User } from "./entity/User"
import { Routes } from "./routes"
import { Request, Response } from "express"

import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import schema from "./graphql"

const PORT = 3000

createConnection().then(async connection => {
  // create express app
  const app = express()
  app.use(bodyParser.json())

  // register express routes from defined application routes
  Routes.forEach(route => {
    ;(app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        )
        if (result instanceof Promise) {
          result.then(
            result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
          )
        } else if (result !== null && result !== undefined) {
          res.json(result)
        }
      }
    )
  })

  const manager = getManager()


  app.use("/graphql", bodyParser.json(), graphqlExpress({ 
    schema: schema,
    context: {
      manager: manager
    }
  }))
  app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })) // if you want GraphiQL 

  app.listen(PORT)

  // insert new users for test
  await connection.manager.save(
    connection.manager.create(User, {
      firstName: "Timber",
      lastName: "Saw",
      age: 27
    })
  )
  await connection.manager.save(
    connection.manager.create(User, {
      firstName: "Phantom",
      lastName: "Assassin",
      age: 24
    })
  )

  console.log(
    "Express application is up and running on port http://localhost:3000/"
  )
}).catch(error => console.log(error));
