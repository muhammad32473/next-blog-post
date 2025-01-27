import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-6">
      <Link href={`/`}>
        <h1 className="ml-10 text-2xl font-bold">My Blog</h1>
      </Link>
      <div className="flex space-x-4 mr-10">
        <Link href={`/create-post`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">Create Post</button>
        </Link>
      </div>
    </header>
  );
};

export default Header
