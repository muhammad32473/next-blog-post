"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const db_1 = __importDefault(require("./db"));
const resolvers = {
    Query: {
        hello: () => "Hello GraphQL!",
        getPosts: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { offset }) {
            const limit = 5;
            // Check if offset is provided
            if (offset == null) {
                return { message: "Please provide offset value" };
            }
            // If the offset isn't a multiple of 5 (5 posts per page)
            if (offset % limit !== 0) {
                throw new apollo_server_1.UserInputError("Invalid offset. It must be a multiple of the page size.");
            }
            try {
                // Fetch posts from the DB using promisePool from db.ts
                const [rows] = yield db_1.default.query('SELECT id, author, title, description, postedAt FROM posts LIMIT ? OFFSET ?', [limit, offset]);
                // Check if it returns an empty array
                if (rows.length === 0) {
                    return { message: "No posts found" };
                }
                // Return the fetched posts
                return { posts: rows, message: "Posts fetched successfully" };
            }
            catch (error) {
                console.error('Error fetching posts:', error);
                // Return a server error response
                throw new Error("Failed to fetch posts due to server error.");
            }
        }),
        totalPostsCount: () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const [rows] = yield db_1.default.query('SELECt COUNT(*) AS totalPosts FROM posts;');
                return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.totalPosts) || 0;
            }
            catch (error) {
                console.log(`Couldn't get total numbers of posts.`, error);
                return null;
            }
        }),
        getPostById: (__1, _a) => __awaiter(void 0, [__1, _a], void 0, function* (__, { id }) {
            // check if id s null 
            if (id === null || !Number.isInteger(id)) {
                return {
                    post: null,
                    message: {
                        message: 'Failed to get Post. Please Enter a valid number.',
                        success: false
                    }
                };
            }
            try {
                // get post from db
                const [rows] = yield db_1.default.query('SELECT * FROM posts WHERE id  = ?', id);
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
                    post: rows[0],
                    message: {
                        message: 'Post retrieved successfully.',
                        success: true
                    }
                };
            }
            catch (error) {
                console.log('Internal Error during fetching Post.', error);
                return {
                    post: null,
                    message: {
                        message: 'Failed to get Post. Please Enter a valid number.',
                        success: false
                    }
                };
            }
        })
    },
    Mutation: {
        createPost: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { author, title, description }) {
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
                };
            }
            // Save the post in the database
            try {
                yield db_1.default.query('INSERT INTO posts (author, title, description, postedAt) VALUES (?, ?, ?, ?)', [author, title, description, postedAt]);
                return {
                    success: true,
                    message: `Post successfully submitted at ${postedAt} by ${author}`
                };
            }
            catch (error) {
                console.error('Error inserting post:', error);
                return {
                    success: false,
                    message: 'Failed to submit post due to database error.'
                };
            }
        }),
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map