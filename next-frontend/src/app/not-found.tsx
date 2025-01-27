import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl text-gray-700 mb-4">Oops! Page Not Found.</p>
            <p className="text-lg text-gray-600 mb-6">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link href="/" className="text-lg text-blue-500 hover:underline">
                Go back to the homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;