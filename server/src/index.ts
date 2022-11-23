import "reflect-metadata"
import { ApolloServer } from "apollo-server"
import { buildSchemaSync } from "type-graphql"
import { SolutionResolver } from "../resolvers/SolutionResolver"

const schema = buildSchemaSync({
  resolvers: [SolutionResolver],
  emitSchemaFile: true,
})

const server = new ApolloServer({ schema })

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Started Apollo Server at ${url}`)
})
