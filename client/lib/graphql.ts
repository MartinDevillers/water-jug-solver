import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const httpLink = new HttpLink({ uri: process.env.API || "http://localhost:4000" })

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
