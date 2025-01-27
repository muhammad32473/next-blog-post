import { gql } from "apollo-server";

const typeDefs = gql`
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
`
export default typeDefs;
