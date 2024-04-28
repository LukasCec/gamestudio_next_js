import React, { useState } from 'react';
import Image from 'next/image';
import myImage from "@/images/3d_yellow_gift_box.png";
import Comment from '@/components/Comment';

import '@/styles/style.css';



export default function NonogramMainCard() {
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [comments, setComments] = useState([
        {
            id: 1,
            name: 'John Doe',
            date: '2021-12-31',
            text: 'This is a great game!',
        },
        {
            id: 2,
            name: 'Jane Doe',
            date: '2021-12-31',
            text: 'I love this game!',
        },
        {
            id: 3,
            name: 'Jack Doe',
            date: '2021-12-31',
            text: 'This is an awesome game!',
        },
    ]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const addComment = (name: string, text: string) => {
        if (!name || !text) {
            // Handle empty name or text (optional)
            alert('Please enter your name and comment text.');
            return;
        }
        const newComment = {
            id: Math.floor(Math.random() * 100000) + 1, // Generate a unique ID
            name,
            text,
            date: new Date().toLocaleDateString(), // Get current date
        };
        setComments([...comments, newComment]); // Add new comment to the state
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);

    };

    const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement; // Access current target (form)
        const nameInput = form.elements.namedItem('name') as HTMLInputElement; // Access name input element
        const commentInput = form.elements.namedItem('comment') as HTMLTextAreaElement; // Access comment textarea element
        const name = nameInput.value;
        const text = commentInput.value;
        addComment(name, text);
        form.reset();
    }


    const setBrushColor = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget as HTMLButtonElement;
        const color = button.name;
        console.log(color);
    };


    const toggleRatingModal = () => {
        setShowRatingModal(!showRatingModal);
    };

    const [ratings, setRatings] = useState([
        {
            id: 1,
            name: 'John Doe',
            date: '28. 4. 2024',
            rating: 5,
        },
        // Add more initial ratings here if needed
    ]);

    const addRating = (name: string, rating: number) => {
        if (!name || !rating) {
            alert('Please enter your name and rating.');
            return;
        }
        const newRating = {
            id: Math.floor(Math.random() * 100000) + 1, // Generate a unique ID
            name,
            rating,
            date: new Date().toLocaleDateString(), // Get current date
        };
        setRatings([...ratings, newRating]); // Add new rating to the state
    };

    const handleAddRating = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement; // Access current target (form)
        const nameInput = form.elements.namedItem('name') as HTMLInputElement; // Access name input element
        const ratingInput = form.elements.namedItem('rating') as HTMLInputElement; // Access rating input element
        const name = nameInput.value;
        const rating = Number(ratingInput.value);
        addRating(name, rating);
        form.reset();
    };

    return (

    <div className="flex justify-center items-center h-full relative">

        <Image src={myImage} alt="My Image" width={200} height={200} className="absolute bottom-[50px] sm:bottom-[110px] md:bottom-[100px] lg:bottom-[80px] xl:bottom-[60px] sm:translate-y-[-40px] right-0 z-20 lg:translate-y-[-70px]" />

        <div className="w-full sm:w-[50vh] md:w-[50vh] lg:w-[50vh] xl:w-[60vh] xl:h-[60vh] lg:h-[60vh] md:h-[60vh] sm:h-[60vh] h-[80vh] bg-gray-600 backdrop-blur-md backdrop-filter bg-opacity-20 rounded-xl shadow-lg p-6 z-10 mx-auto">
            <h1 className="text-center text-white text-2xl font-bold">🏆NONOGRAM</h1>

            <p className="text-center text-white text-lg font-semibold">Nonograms are logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden picture.</p>

            <div className="flex justify-center items-center mt-4 mr-3">
                <button onClick={setBrushColor} name="red" className="w-10 h-10 bg-red-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110"></button>
                <button onClick={setBrushColor} name="green" className="w-10 h-10 bg-green-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110"></button>
                <button onClick={setBrushColor} name="blue" className="w-10 h-10 bg-blue-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110"></button>
            </div>

            <table className="mx-auto mt-4 border-collapse border-2 border-white">
                <tbody>
                {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                        {[...Array(5)].map((_, j) => (
                            <td key={j} className="border-2 border-white h-14 w-14 duration-200 hover:bg-white hover:bg-opacity-20 "></td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={toggleModal} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Comments
            </button>
            <button onClick={toggleRatingModal} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add Rating
            </button>

            <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900  bg-opacity-50 z-50 transition-opacity duration-300 ${showRatingModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="bg-gray-800 p-6 rounded-lg text-white z-50 max-h-[80vh]  flex flex-col">
                    <h1 className="text-2xl text-center font-bold">Add Rating</h1>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    {ratings.map((rating) => (
                        <div key={rating.id} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
                            <p className="text-lg text-orange-400 font-semibold">{rating.name}</p>
                            <p className="text-sm text-gray-400">{rating.date}</p>
                            <p className="mt-2 text-2xl">{rating.rating}⭐</p>
                        </div>
                    ))}
                    <form onSubmit={handleAddRating} className="flex flex-col pt-5 pb-5">
                        <input type="text" name="name" placeholder="Your Name" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />
                        <input type="number" min="1" max="5" name="rating" placeholder="Your Rating (1-5)" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />
                        <button type="submit" className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700 mb-7">Submit Rating</button>
                    </form>
                    <button onClick={toggleRatingModal} className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700">Close</button>
                </div>
            </div>

            <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900  bg-opacity-50 z-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                <div className="bg-gray-800 p-6 rounded-lg text-white z-50 max-h-[80vh]  flex flex-col">
                    <div className="overflow-y-auto ">
                        <h1 className="text-2xl text-center font-bold">Comments</h1>
                        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                        {showNotification && (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-0 z-60 transition-opacity duration-300 opacity-100">
                                <div className="bg-gray-800 p-6 rounded-lg text-white z-60">
                                    Comment Added!
                                </div>
                            </div>
                        )}
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
                                <p className="text-lg text-orange-400 font-semibold">{comment.name}</p>
                                <p className="text-sm text-gray-400">{comment.date}</p>
                                <p className="mt-2">{comment.text}</p>
                            </div>
                        ))}
                        {/*comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))*/}
                    </div>
                    <div className="mt-auto">
                        <form onSubmit={handleAddComment} className="flex flex-col pt-5 pb-5">
                            <input type="text" name="name" placeholder="Your Name" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />
                            <input type="text" name="comment" placeholder="Add your comment" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2"></input>
                            <button type="submit" className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700 mb-7">Add Comment</button>
                        </form>
                        <button onClick={toggleModal} className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700">Close</button>
                    </div>
                </div>
            </div>


        </div>
    </div>
);
};