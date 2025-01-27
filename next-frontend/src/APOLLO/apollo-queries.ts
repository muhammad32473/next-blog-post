import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.GRAPHQL_API as string);

export default client;

export const getPosts = gql`
    query getPosts($offset: Int) {
        getPosts(offset: $offset) {
            posts {
                id
                title
                description
                postedAt
            }
        }
        totalPostsCount            
    }
`;

export const createPosts =
    " mutation Mutation($author: String!, $title: String!, $description: String!) { createPost(author: $author, title: $title, description: $description) {success message} } ";
    

