import React from 'react';

interface CommentProps {
    comment: {
        id: number;
        name: string;
        date: string;
        text: string;
    };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div key={comment.id} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
            <p className="text-lg text-orange-400 font-semibold">{comment.name}</p>
            <p className="text-sm text-gray-400">{comment.date}</p>
            <p className="mt-2">{comment.text}</p>
        </div>
    );
};

export default Comment;