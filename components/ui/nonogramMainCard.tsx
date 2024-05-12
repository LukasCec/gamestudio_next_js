import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import myImage from "@/images/3d_yellow_gift_box.png";
import Comment from '@/components/Comment';

import '@/styles/style.css';
import {postComment} from "@/components/CommentPost";
import {postRating} from "@/components/RatingPost";
import {postScore} from "@/components/ScorePost";

export default function NonogramMainCard() {
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [brushColor, setBrushColor] = useState(""); // Define brushColor state
    const [health, setHealth] = useState(3);
    const [comments, setComments] = useState<MappedComment[]>([]);
    const [solutionField, setSolutionField] = useState<string[][]>([[]]);
    const [selectedBrush, setSelectedBrush] = useState("AZURE");
    const [scores, setScores] = useState<Score[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [rowHints, setRowHints] = useState<string[][]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [columnHints, setColumnHints] = useState<string[][]>([]);
    const [fetchedData, setFetchedData] = useState<string[][]>(
        Array(5).fill(0).map(() => Array(5).fill('EMPTY'))
    );


    interface Comment {
        player: string;
        game: string;
        comment: string;
        commentedOn: string;
    }
    interface MappedComment {
        player: string;
        game: string;
        comment: string;
        commentedOn: string;
    }
    interface Rating {
        ident: number;
        game: string;
        player: string;
        rating: number;
        ratedOn: string;
    }
    interface Score {
        ident: number;
        game: string;
        player: string;
        points: number;
        playedOn: string;
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/comment/nonogram')
            .then(response => response.json())
            .then((data: Comment[]) => {
                const mappedData = data.map((comment: Comment): MappedComment => ({
                    player: comment.player,
                    game: "nonogram",
                    comment: comment.comment,
                    commentedOn: comment.commentedOn,
                }));
                setComments(mappedData);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    const toggleModal = () => {
        fetchComments();
        setShowModal(!showModal);
    };
    const handlePostComment = async () => {
        const player = localStorage.getItem('username') || '';
        const game = "nonogram"; // replace with actual game name
        const comment =  (document.getElementById('comment') as HTMLInputElement).value;
        const commentedOn = new Date().toISOString();

        if(comment != '') {
            const result = await postComment({player, game, comment, commentedOn});
            console.log(result ? "Comment posted successfully" : "Failed to post comment");
        }

    };
    const handlePostRating = async () => {
        const player = localStorage.getItem('username') || '';
        const game = "nonogram"; // replace with actual game name
        const rating =  parseInt((document.getElementById('rating') as HTMLInputElement).value);
        const ratedOn = new Date().toISOString();

        if(!isNaN(rating)) {
            const result = await postRating({player, game, rating, ratedOn});
            console.log(result ? "Rating posted successfully" : "Failed to post rating");
        }
    }
    const handleAddScore = async () => {
        const player = (document.getElementById('playerName') as HTMLInputElement).value;
        const game = "nonogram"; // replace with actual game name
        const playedOn = new Date().toISOString();
        const points = score;

        if(player != '') {
            const result = await postScore({player, game, points, playedOn});
            console.log(result ? "Score posted successfully" : "Failed to post score");
            //REFRESH THE PAGE
            window.location.reload();
        }
    }
    const fetchComments = () => {
        fetch('http://localhost:8080/api/comment/nonogram')
            .then(response => response.json())
            .then((data: Comment[]) => {
                const mappedData = data.map((comment: Comment): MappedComment => ({
                    player: comment.player,
                    game: "nonogram",
                    comment: comment.comment,
                    commentedOn: comment.commentedOn,
                }));
                setComments(mappedData);
            })
            .catch(error => console.error('Error:', error));
    };
    const fetchRatings = () => {
        fetch('http://localhost:8080/api/rating/nonogram')
            .then(response => response.json())
            .then((data: Rating[]) => {
                setRatings(data);
            })
            .catch(error => console.error('Error:', error));
    };
    const toggleRatingModal = () => {
        // Make a GET request to the average rating API endpoint
        fetch('http://localhost:8080/api/rating/nonogram/average')
            .then(response => response.json())
            .then((data: number) => {
                // Update the averageRating state variable with the fetched data
                setAverageRating(data);
            })
            .catch(error => console.error('Error:', error));

        // Fetch ratings and toggle the showRatingModal state variable
        fetchRatings();
        setShowRatingModal(!showRatingModal);
    };
    useEffect(() => {
        if (health === 0) {
            // Reset the game
            setScore(0);
            setHealth(3);
            // reload the page
            window.location.reload();
        }
    }, [health]);
    const handleSetBrushColor = (color: string) => {
        setBrushColor(color); // Update brushColor state when a button is clicked
        setSelectedBrush(color); // Update selectedBrush state

        console.log(`Posting color: ${color}`); // Log the selected color

        // Make a POST request to the setBrushColor API endpoint
        fetch(`http://localhost:8080/api/nonogram/field/setBrushColor/${color}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brushColorState: color }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Only parse as JSON if the response is not empty
                return response.text().then(text => text ? JSON.parse(text) : {})
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    useEffect(() => {
        console.log(fetchedData);
    }, [fetchedData]);
    let [score, setScore] = useState(0);
    useEffect(() => {
        fetch('http://localhost:8080/api/nonogram/field/getnewField')
            .then(response => response.json())
            .then(data => {
                setSolutionField(data.tileStates); // Save only the tileStates to the solutionField state

                 // Log the generated hints
            })
            .catch(error => console.error('Error:', error));

    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/api/rating/nonogram')
            .then(response => response.json())
            .then((data: Rating[]) => {
                setRatings(data);
            })
            .catch(error => console.error('Error:', error));
    }, [])
    const handleAddRating = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        const ratingInput = form.elements.namedItem('rating') as HTMLInputElement;

        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset() * 60;
        const ratedOn = "2022-04-03T12:40:33.222000+00:00";

        const newRating = {
            game: "nonogram",
            player: nameInput.value,
            rating: parseInt(ratingInput.value),
            ratedOn: ratedOn,
        };

        console.log(`Posting rating: ${JSON.stringify(newRating)}`);

        fetch('http://localhost:8080/api/rating', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRating),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Only parse as JSON if the response is not empty
                return response.text().then(text => text ? JSON.parse(text) : {})
            })
            .then(data => {
                console.log('Success:', data);

                const mappedRating: Rating = {
                    ident: data.ident,
                    player: data.player,
                    game: "nonogram",
                    rating: data.rating,
                    ratedOn: data.ratedOn,
                };

                setRatings(prevRatings => [...prevRatings, mappedRating]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        form.reset();
    };
    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }
    const fetchScores = () => {
        fetch('http://localhost:8080/api/score/nonogram')
            .then(response => response.json())
            .then((data: Score[]) => {
                setScores(data);
            })
            .catch(error => console.error('Error:', error));
    };
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);

    let HintsRow: string[][] = [];
    let HintsColumn: string[][] = [];

    function checkSolutionField(solutionField: string[][]) {
        const targetField1 = [
            ["GREEN","BROWN","GREEN","BROWN","GREEN"],
            ["AZURE","GREEN","GREEN","GREEN","EMPTY"],
            ["EMPTY","BROWN","BROWN","AZURE","GREEN"],
            ["GREEN","GREEN","GREEN","EMPTY","GREEN"],
            ["GREEN","GREEN","AZURE","BROWN","EMPTY"]
        ];
        const targetField2 = [
            ["AZURE","GREEN","EMPTY","EMPTY","EMPTY"],
            ["AZURE","EMPTY","EMPTY","EMPTY","EMPTY"],
            ["AZURE","BROWN","BROWN","EMPTY","EMPTY"],
            ["EMPTY","EMPTY","EMPTY","EMPTY","EMPTY"],
            ["EMPTY","EMPTY","EMPTY","EMPTY","EMPTY"]
        ];
        const targetField3 = [
            ["AZURE","BROWN","AZURE","AZURE","BROWN"],
            ["AZURE","BROWN","GREEN","GREEN","EMPTY"],
            ["EMPTY","BROWN","BROWN","BROWN","GREEN"],
            ["AZURE","EMPTY","AZURE","EMPTY","BROWN"],
            ["BROWN","AZURE","AZURE","BROWN","EMPTY"]
        ];
        const targetField4 = [
            ["BROWN","BROWN","AZURE","BROWN","BROWN"],
            ["BROWN","BROWN","GREEN","BROWN","BROWN"],
            ["EMPTY","BROWN","BROWN","AZURE","GREEN"],
            ["BROWN","GREEN","GREEN","EMPTY","BROWN"],
            ["BROWN","BROWN","AZURE","BROWN","BROWN"]
        ];

        if (JSON.stringify(solutionField) === JSON.stringify(targetField1)) {
            console.log(1);
            //make array named HintsRow
             HintsRow = [
                ["1G 1B 1G 1B 1G"],
                ["1A 3G"],
                ["2B 1A 1G"],
                ["3G 1G"],
                ["2G 1A 1B"]
            ];
             HintsColumn = [
                ["1G 1A 2G"],
                ["1B 1G 1B 2G"],
                ["2G 1B 1G 1A"],
                ["1B 1G 1A 1B"],
                ["1G 2G"]
            ];


            setRowHints(HintsRow);
            setColumnHints(HintsColumn);

        }
        else if (JSON.stringify(solutionField) === JSON.stringify(targetField2)) {
            console.log(2);
            HintsRow = [
                ["1A 1G"],
                ["1A"],
                ["1A 2B"],
                [],
                []
            ];
            HintsColumn = [
                ["3A"],
                ["1G 1B"],
                ["1B"],
                [],
                []
            ];

            setRowHints(HintsRow);
            setColumnHints(HintsColumn);
        }
        else if (JSON.stringify(solutionField) === JSON.stringify(targetField3)) {
            console.log(3);
            HintsRow = [
                ["1A 1B 2A 1B"],
                ["1A 1B 2G"],
                ["3B 1G"],
                ["1A 1A 1B"],
                ["1B 2A 1B"]
            ];
            HintsColumn = [
                ["2A 1A 1B"],
                ["3B 1A"],
                ["1A 1G 1B 2A"],
                ["1A 1G 1B 1B"],
                ["1B 1G 1B"]
            ];

            setRowHints(HintsRow);
            setColumnHints(HintsColumn);

        }
        else if (JSON.stringify(solutionField) === JSON.stringify(targetField4)) {
            console.log(4);
            HintsRow = [
                ["2B 1A 2B"],
                ["2B 1G 2B"],
                ["2B 1A 1G"],
                ["1B 2G 1B"],
                ["2B 1A 2B"]
            ];
            HintsColumn = [
                ["2B 2B"],
                ["3B 1G 1B"],
                ["1A 1G 1B 1G 1A"],
                ["2B 1A 1B"],
                ["2B 1G 2B"]
            ];


            setRowHints(HintsRow);
            setColumnHints(HintsColumn);
        }
        else {
            console.log("neni");
        }
    }

    useEffect(() => {
        checkSolutionField(solutionField);
    }, [solutionField]);

    const [showScoresModal, setShowScoresModal] = useState(false);

// Add a function to handle the click event on the button
    // Modify the toggleScoresModal function to include a fetch request
    const toggleScoresModal = () => {
        // Make a GET request to the scores API endpoint
        fetch('http://localhost:8080/api/score/nonogram')
            .then(response => response.json())
            .then((data: Score[]) => {
                // Update the scores state variable with the fetched data
                setScores(data);
            })
            .catch(error => console.error('Error:', error));

        // Toggle the showScoresModal state variable
        setShowScoresModal(!showScoresModal);
    };
    return (
        <div className="nonoMainCard flex justify-center items-center h-full relative">


            <Image src={myImage} alt="My Image" width={200} height={200} className="absolute hidden bottom-[50px] sm:bottom-[110px] md:bottom-[100px] lg:bottom-[80px] xl:bottom-[60px] sm:translate-y-[-40px] right-0 z-20 lg:translate-y-[-70px]" />
            <div className="w-full sm:w-[50vh] md:w-[50vh] lg:w-[50vh] xl:w-[60vh] sm:h-auto md:h-auto lg:h-auto xl:h-auto h-auto bg-gray-600 backdrop-blur-md backdrop-filter bg-opacity-20 rounded-xl shadow-lg p-6 z-10 mx-auto">
                <h1 className="text-center text-white text-2xl font-bold" >🏆NONOGRAM</h1>

                <p className="text-white text-center">Score: {score} | Lives: {health}</p>
                <p className="text-center text-white text-lg font-semibold">Nonograms are logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden picture.</p>
                <div className="flex justify-center items-center mt-4 mr-3">
                    <button onClick={() => handleSetBrushColor('AZURE')} name="AZURE" className={`w-10 h-10 bg-teal-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110 ${selectedBrush === 'AZURE' ? 'border-4 border-amber-300' : ''}`}>A</button>
                    <button onClick={() => handleSetBrushColor('GREEN')} name="GREEN" className={`w-10 h-10 bg-green-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110 ${selectedBrush === 'GREEN' ? 'border-4 border-amber-300' : ''}`}>G</button>
                    <button onClick={() => handleSetBrushColor('BROWN')} name="BROWN" className={`w-10 h-10 bg-orange-950 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110 ${selectedBrush === 'BROWN' ? 'border-4 border-amber-300' : ''}`}>B</button>
                </div>

                <div className="flex justify-between">
                    <div className="RowHints text-white whitespace-nowrap pt-3">
                        <br></br>
                        {rowHints.map((row, index) => (
                            <p className="h-14 text-right" key={index}>{row.join(", ")}</p>
                        ))}

                    </div>
                    <table className=" mt-4 border-collapse border-2 rounded-2xl border-white">
                        <tbody>

                        {fetchedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`border-2 border-white h-14 w-14 duration-200 hover:bg-white hover:bg-opacity-20 ${cell !== 'EMPTY' ? 'bg-gray-700' : ''}`}
                                        onClick={(event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
                                            console.log(rowIndex, cellIndex);
                                            console.log(fetchedData[rowIndex][cellIndex]);


                                            // Add a null check for solutionField
                                            if (solutionField) {
                                                const currentCellValue = solutionField[rowIndex][cellIndex];
                                                const cell = event.currentTarget as HTMLTableCellElement;

                                                // If the current cell value matches the selected brush, change the background color to red
                                                if (currentCellValue === selectedBrush) {
                                                    // Increase the score by 1
                                                    setScore(score + 1);
                                                    if(selectedBrush === 'AZURE') {
                                                        fetchedData[rowIndex][cellIndex] = 'AZURE';
                                                        //console log full array of fetchedData
                                                        console.log(fetchedData);
                                                        cell.style.backgroundColor = '#14b8a6';
                                                    }
                                                    if(selectedBrush === 'GREEN') {
                                                        fetchedData[rowIndex][cellIndex] = 'GREEN';
                                                        console.log(fetchedData);
                                                        cell.style.backgroundColor = '#22c55e';
                                                    }
                                                    if(selectedBrush === 'BROWN') {
                                                        fetchedData[rowIndex][cellIndex] = 'BROWN';
                                                        console.log(fetchedData);
                                                        cell.style.backgroundColor = '#431407';
                                                    }


                                                    if (JSON.stringify(fetchedData) === JSON.stringify(solutionField)) {
                                                        console.log("Game is Won");
                                                        fetchScores();
                                                        setIsGameWon(true);
                                                    }

                                                    else if (JSON.stringify(fetchedData) !== JSON.stringify(solutionField)) {
                                                        console.log("Game is not Won");
                                                        fetchScores();
                                                        setIsGameWon(false);
                                                    }
                                                }
                                                else {

                                                    console.log('The current cell value does not match the brush color.');
                                                    cell.style.backgroundColor = 'red';
                                                    setTimeout(() => {
                                                        cell.style.backgroundColor = '';
                                                    }, 500);


                                                    setScore(0);
                                                    setHealth(health - 1);
                                                }
                                            }

                                        }}
                                    ></td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>

                <button onClick={toggleModal} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Comments</button>
                <button onClick={toggleRatingModal} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Rating</button>
                <button onClick={toggleScoresModal} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Top Scores</button>
                <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900  bg-opacity-50 z-50 transition-opacity duration-300 ${showRatingModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-gray-800 p-6 rounded-lg text-white z-50 flex flex-col">
                        <h1 className="text-2xl text-center font-bold">Add Rating</h1>
                        <p className="text-center text-white">Average Rating: {averageRating}⭐</p>

                        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="overflow-auto max-h-[200px]"> {/* Add this line */}
                            {ratings.map((rating) => (
                                <div key={rating.ident} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
                                    <p className="text-lg text-orange-400 font-semibold">{rating.player}</p>
                                    <p className="text-sm text-gray-400">{formatDate(rating.ratedOn)}</p>
                                    <p className="mt-2 text-2xl">{rating.rating}⭐</p>
                                </div>
                            ))}
                        </div> {/* And this line */}
                        <form onSubmit={handlePostRating} className="flex flex-col pt-5 pb-5">
                            <input type="text" value={localStorage.getItem('username') || ''} name="name" placeholder="Your Name" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />
                            <input id="rating" type="number" min="1" max="5" name="rating" placeholder="Your Rating (1-5)" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />
                            <button type="submit" className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700 mb-7">Submit Rating</button>
                            <button onClick={toggleRatingModal} className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700">Close</button>
                        </form>
                    </div>
                </div>


                {isGameWon && (
                    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900  bg-opacity-50 z-50 transition-opacity duration-300 ${isGameWon ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="bg-gray-800 p-6 rounded-lg text-white z-50 max-h-[80vh] flex flex-col">
                            <h1 className="text-2xl text-center font-bold">Game is Won</h1>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="scores-container overflow-y-auto max-h-[400px]">
                                {scores.map((score) => (
                                    <div key={score.ident} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
                                        <p className="text-lg text-orange-400 font-semibold">{score.player}</p>
                                        <p className="text-sm text-gray-400">{formatDate(score.playedOn)}</p>
                                        <p className="mt-2">{score.points}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="pt-2 font-bold">Your Score: {score}</p>

                            <input type="text" value={localStorage.getItem('username') || ''} id="playerName" placeholder="Your Name" className="mt-1 py-2 border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />

                            <button onClick={handleAddScore} className="mb-7 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Score</button>
                            <button onClick={() => setIsGameWon(false)} className="bg-gray-900 text-white py-2 px-4 duration-500 rounded hover:bg-orange-700 mt-auto">Close</button>
                        </div>
                    </div>
                )}
                <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900  bg-opacity-50 z-50 transition-opacity duration-300 ${showScoresModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-gray-800 p-6 rounded-lg text-white z-50 max-h-[80vh] flex flex-col">
                        <h1 className="text-2xl text-center font-bold">Scores</h1>
                        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="scores-container overflow-y-auto max-h-[400px]">
                            {scores.map((score) => (
                                <div key={score.ident} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
                                    <p className="text-lg text-orange-400 font-semibold">{score.player}</p>
                                    <p className="text-sm text-gray-400">{formatDate(score.playedOn)}</p>
                                    <p className="mt-2">{score.points}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={toggleScoresModal} className="bg-gray-900 text-white py-2 px-4 duration-500 mt-3  rounded hover:bg-orange-700 ">Close</button>
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
                                <div key={comment.player} className="bg-gray-700 p-4 pr-32 rounded-lg mb-4">
                                    <p className="text-lg text-orange-400 font-semibold">{comment.player}</p>
                                    <p className="text-sm text-gray-400">{formatDate(comment.commentedOn)}</p>
                                    <p className="mt-2">{comment.comment}</p>
                                </div>
                            ))}
                            {/*comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))*/}
                        </div>
                        <div className="mt-auto">
                            <form onSubmit={handlePostComment} className="flex flex-col pt-5 pb-5">
                                <input type="text"  value={localStorage.getItem('username') || ''} name="name" placeholder="Your Name" className="border  bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2" />
                                <input id="comment" type="text" name="comment" placeholder="Add your comment" className="border bg-gray-700 border-gray-800 rounded px-2 h-10 align-middle flex-grow mb-2"></input>
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