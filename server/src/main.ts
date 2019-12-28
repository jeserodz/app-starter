import * as path from "path";
import * as Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchemaSync } from "type-graphql";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { AuthMiddleware, GraphqlAuthChecker } from "./middlewares/auth.middleware";
import "./config";

createConnection();

const app = Express();

app.use(AuthMiddleware);

/*****************************************************************************
 * GraphQL Setup
 *****************************************************************************/
const schema = buildSchemaSync({
  resolvers,
  authChecker: GraphqlAuthChecker,
  emitSchemaFile: path.resolve(__dirname, "schema.gql")
});

const server = new ApolloServer({
  schema,
  context: ctx => ctx,
  playground: true
});

server.applyMiddleware({ app });
/*****************************************************************************/

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
