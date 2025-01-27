import { fetchPostById } from "@/APOLLO/apollo-client"; // Ensure this points to the correct path
import { notFound } from "next/navigation";
import React from "react";

interface PostPageProps {
    params: Promise<{ postId: string }>;
}

interface PostData {
    id: number;
    title: string;
    description: string;
    author: string;
    postedAt: string;
}

export default async function PostPage({ params }: PostPageProps) {
    const {postId} = await params;
    
    const postIdInt = parseInt(postId, 10);

    let post: PostData | null = null;

    // Fetch the post data by ID
    try {
        const result = await fetchPostById(postIdInt);
        post = result?.post ?? null;

        // Redirect to 404 if the post isn't found
        if (!post) {
            notFound();
        }
    } catch (error) {
        console.error("Failed to fetch post:", error);
        notFound(); // Redirect to 404 on fetch error
    }

    // Render the post data
    return (
        <div className="container mx-auto p-4">
            {post ? (
                <div className="border p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-700 mb-4">{post.description}</p>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Author:</span> {post.author}
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Posted at:</span> {post.postedAt}
                    </p>
                </div>
            ) : (
                <div className="text-center py-20">
                    <h1 className="text-2xl font-semibold">Post not found</h1>
                    <p className="text-gray-600 mt-2">It seems the post doesn&apos;t exist or has been removed.</p>
                </div>
            )}
        </div>
    );
}
