import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { buildSchemaSync } from "type-graphql"
import { SolutionResolver } from "../resolvers/SolutionResolver"

const schema = buildSchemaSync({
  resolvers: [SolutionResolver],
})

const server = new ApolloServer({ schema })

export default server
