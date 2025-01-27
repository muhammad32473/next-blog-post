import  { gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_API as string,
    cache: new InMemoryCache() 
})

const getPostById = gql`
    query Query($getPostByIdId: Int!) {
        getPostById(id: $getPostByIdId) {
            message {
                success
                message
            }
            post {
                author
                description
                id
                postedAt
                title
            }
        }
    }`;

    export async function fetchPostById(id: number) {
     try {
        console.log("Fetching Post By Id: ", id, '...');
        const { data } = await client.query({
            query: getPostById,
            variables: { getPostByIdId: id},
        });

        return data.getPostById;
     } catch (error) {
        console.log("Failed to Fetch Post By Id: ", id, '... ', error);
     }   
    }