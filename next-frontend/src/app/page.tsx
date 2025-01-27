import { fetchPosts } from "@/APOLLO/fetch-posts";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 5;

// Define the correct type for searchParams
interface HomePageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
    console.log("HomePage component called");

    // Get the current page number from search params (default to 1)
    const param = await searchParams;
    console.log("searchParams resolved:", param);

    const currentPage = parseInt(param?.page || '1', 10);
    console.log("currentPage:", currentPage);

    if (isNaN(currentPage) || currentPage <= 0) {
        console.log("Invalid page number, triggering notFound()");
        notFound(); // Handle invalid page numbers
    }

    // Calculate offset based on current page
    const offset = (currentPage - 1) * POSTS_PER_PAGE;
    console.log("offset:", offset);

    // Fetch posts for the current page
    const { posts, totalCount } = await fetchPosts(offset);
    console.log("Total count of posts:", totalCount);

    if (!posts || posts.length === 0) {
        console.log("No posts found, triggering notFound()");
        notFound(); // Handle no posts found
    }

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
    console.log("Total pages for pagination:", totalPages);

    return (
        <div>
            <h1 className="md:text-4xl font-bold mb-4 flex justify-center p-4">Posts</h1>

            {/* Render posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="flex justify-center items-center">
                        <Link className="border p-4 rounded-lg shadow-md w-full" href={`/post/${post.id}`}>
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-gray-600">{post.description}</p>
                                <p className="text-sm text-gray-400 mt-2">{post.postedAt}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        key={index}
                        href={`/?page=${index + 1}`}
                        className={`px-4 py-2 mx-1 ${index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
                    >
                        {index + 1}
                    </a>
                ))}
            </div>
        </div>
    );
};

export const revalidate = 60; // Regenerate the page every 60 seconds
