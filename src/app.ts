import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  applyGraphQL,
  gql,
  GQLError,
} from "https://deno.land/x/oak_graphql/mod.ts";

const app = new Application();

const types = (gql as any)`

type Query {
  hello: String! 
}
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx) => {
    return { token: ctx.request.headers.get("authorization") || "" };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server listening at http://localhost:4000");
await app.listen({ port: 4000 });
