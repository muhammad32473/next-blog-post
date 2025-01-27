'use client'
import { createPosts } from '@/APOLLO/apollo-queries';
import React, { useState, useEffect } from 'react';

export default function CreatePostForm() {
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        authorError: null as string | null,
        titleError: null as string | null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({
        successMsg: "",
        failureMsg: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Handle validation directly in the handleChange function
        if (name === "author") {
            const authorPattern = /^[a-zA-Z][a-zA-Z\s]*$/;
            setErrors((prev) => ({
                ...prev,
                authorError: !value || !authorPattern.test(value)
                    ? "Author name should not start with a number and cannot contain special characters."
                    : null,
            }));
        }

        if (name === "title") {
            const titlePattern = /^[A-Za-z0-9].*$/;
            setErrors((prev) => ({
                ...prev,
                titleError: !value || !titlePattern.test(value)
                    ? "Title should not start with a special character."
                    : null,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { authorError, titleError } = errors;
        if (!authorError && !titleError && formData.description.trim()) {
            const postsData = { ...formData };

            try {
                setIsLoading(true);
                setMessage({ successMsg: "", failureMsg: "" });

                const response = await fetch(process.env.GRAPHQL_API as string, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: createPosts,
                        variables: postsData,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data?.data?.createPost?.success) {
                    setMessage({ successMsg: "Post Submitted Successfully", failureMsg: "" });
                } else {
                    setMessage({ successMsg: "", failureMsg: "Unexpected Error Submitting the Post" });
                }
            } catch (error) {
                setMessage({ successMsg: "", failureMsg: "Unexpected Error Submitting the Post" });
                console.log("Unexpected Error Submitting the Post", error)
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (message.successMsg) {
            setFormData({
                author: "",
                title: "",
                description: "",
            });
        }
    }, [message.successMsg]); // Reset the form after a successful submission

    return (
        <div className="max-w-md mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Create a New Post</h1>

            {/* Display Success or Failure Message */}
            {message.successMsg && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                    {message.successMsg}
                </div>
            )}
            {message.failureMsg && (
                <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                    {message.failureMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Author Name Field */}
                <div>
                    <label htmlFor="author" className="block text-sm sm:text-base font-medium text-gray-700">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        required
                        maxLength={30}
                    />
                    {errors.authorError && <p className="text-red-500 text-sm sm:text-base mt-1">{errors.authorError}</p>}
                </div>

                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm sm:text-base font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        required
                        maxLength={75}
                    />
                    {errors.titleError && <p className="text-red-500 text-sm sm:text-base mt-1">{errors.titleError}</p>}
                </div>

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        rows={4}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 mt-4 sm:mt-6 mb-4 sm:mb-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        disabled={errors.authorError !== null || errors.titleError !== null || formData.description.trim() === "" || isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
