import { startStandaloneServer } from "@apollo/server/standalone"
import server from "./apollo-server"

startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
