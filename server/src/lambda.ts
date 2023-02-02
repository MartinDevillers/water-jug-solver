import { startServerAndCreateLambdaHandler, handlers } from "@as-integrations/aws-lambda"
import server from "./apollo-server"

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
)
