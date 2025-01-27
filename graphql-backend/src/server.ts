import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
}).catch((error) => {
    console.error("Error starting server:", error);
});
