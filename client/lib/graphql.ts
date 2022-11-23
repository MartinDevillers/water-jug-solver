import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const httpLink = new HttpLink({ uri: "http://localhost:4000" })
// const httpLink = new HttpLink({ uri: "http://water-jug-solver-server.us-east-1.elasticbeanstalk.com" })

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
