"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
    type Post {
        id: Int!
        author: String!
        title: String!
        description: String!
        postedAt: String!
    }

    type GetPostsResponse {
        posts: [Post]
        message: String!
    }

    type Response {
        success: Boolean!
        message: String!
    }

    type GetPostByIdResponse {
        post: Post
        message: Response
    }

    type Query {
        hello: String
        getPosts(offset: Int): GetPostsResponse!
        getPostById(id: Int!): GetPostByIdResponse!
        totalPostsCount: Int!
    }

    type Mutation {
        createPost(author: String!, title: String!, description: String!): Response
    }
`;
exports.default = typeDefs;
//# sourceMappingURL=schema.js.map