import { UserInputError } from "apollo-server";
import { RowDataPacket } from "mysql2";
import promisePool from "./db";

type PostInput = {
    author: string;
    title: string;
    description: string;
};

type Post = {
    id: Number;
    author: String;
    title: String;
    description: String;
    postedAt: String;
    }

interface totalPostsRow extends RowDataPacket {
    totalPosts: Number;
}

const resolvers = {
    Query: {
        hello: () => "Hello GraphQL!",
        getPosts: async (_: any, { offset }: { offset: number }) => {
            const limit = 5;

            // Check if offset is provided
            if (offset == null) {
                return { message: "Please provide offset value" };
            }

            // If the offset isn't a multiple of 5 (5 posts per page)
            if (offset % limit !== 0) {
                throw new UserInputError("Invalid offset. It must be a multiple of the page size.");
            }

            try {
                // Fetch posts from the DB using promisePool from db.ts
                const [rows] = await promisePool.query<RowDataPacket[]>(
                    'SELECT id, author, title, description, postedAt FROM posts LIMIT ? OFFSET ?',
                    [limit, offset]
                );

                // Check if it returns an empty array
                if (rows.length === 0) {
                    return { message: "No posts found" };
                }

                // Return the fetched posts
                return { posts: rows, message: "Posts fetched successfully" };

            } catch (error) {
                console.error('Error fetching posts:', error);
                // Return a server error response
                throw new Error("Failed to fetch posts due to server error.");
            }
        },
        totalPostsCount: async () => {
            try {
                const [rows] = await promisePool.query<totalPostsRow[]>(
                    'SELECt COUNT(*) AS totalPosts FROM posts;');
                return rows[0]?.totalPosts || 0;
            } catch (error) {
                console.log(`Couldn't get total numbers of posts.`, error);
                return null;
            }
        },
        getPostById: async (__: any, { id }: { id: number }) => {
            // check if id s null 
            if (id === null || !Number.isInteger(id) ) {
                return {
                    post: null,
                    message: {
                        message: 'Failed to get Post. Please Enter a valid number.',
                        success: false
                    }
                }
            }

            try {
                // get post from db
                const [rows] = await promisePool.query<RowDataPacket[]>('SELECT * FROM posts WHERE id  = ?',
                    id
                );

                // check if its empty
                if (rows.length === 0) {
                    return {
                        post: null,
                        message: {
                            message: 'Failed to get Post. Please Enter a valid number.',
                            success: false
                        }
                    };
                }

                // return fetched post
                return {
                    post: rows[0] as Post,
                    message: {
                        message:'Post retrieved successfully.',
                        success: true
                    }
                };
            } catch (error) {
                console.log('Internal Error during fetching Post.', error);
                return {
                    post: null,
                    message: {
                        message: 'Failed to get Post. Please Enter a valid number.',
                        success: false
                    }
                };
            }
        }
    },
    Mutation: {
        createPost: async (_: any, { author, title, description }: PostInput) => {
            const postedAt = new Date().toISOString();

            // Basic validation to check if fields are empty
            if (!author || !title || !description) {
                return "Author, title, and description are required fields.";
            }

            // Validate that the author name doesn't start with a number or special character
            const authorRegex = /^[a-zA-Z][a-zA-Z\s]*$/; // Can start with a letter, followed by alphanumeric characters
            if (!authorRegex.test(author)) {
                return {
                    success: false,
                    message: "Author name must start with a letter and only contain alphanumeric characters."
                }
            }

            // Save the post in the database
            try {
                await promisePool.query('INSERT INTO posts (author, title, description, postedAt) VALUES (?, ?, ?, ?)',
                    [author, title, description, postedAt]
                );

                return {
                    success: true,
                    message: `Post successfully submitted at ${postedAt} by ${author}`
                }
            } catch (error) {
                console.error('Error inserting post:', error);
                return {
                    success: false,
                    message: 'Failed to submit post due to database error.'
                };
            }
        },
    }
};

export default resolvers;
