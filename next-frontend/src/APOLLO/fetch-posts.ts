import client from '@/APOLLO/apollo-queries';
import { getPosts } from '@/APOLLO/apollo-queries';

// Define the expected type of the data returned by the query
export interface Post {
    id: string;
    title: string;
    description: string;
    postedAt: string;
}

interface GetPostsResponse {
    getPosts: {
        posts: Post[];
    };
    totalPostsCount: number;
}

// making request to graphql backend  
export async function fetchPosts(offset: number): Promise<{ posts: Post[]; totalCount: number }> {
    try {
        console.log("Fetching Posts Data from backend...");
        const data: GetPostsResponse = await client.request<GetPostsResponse>(getPosts, { offset });
        console.log("Posts fetched successfully.")
        return {
            posts: data.getPosts.posts,
            totalCount: data.totalPostsCount,    
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
    }
};