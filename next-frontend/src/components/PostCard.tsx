import React from 'react';

const PostCard = ({ title, description, date, }: { title: string; description: string; date: string; }) => {
    return (
        <div className="w-7/12 max-w-full gap-6">
            <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-2xl font-extrabold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-sm text-gray-500">
                    <p>Posted on: {date}</p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
