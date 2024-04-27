import React from "react";
import Image from 'next/image';
import myImage from "@/images/3d_yellow_gift_box.png";
import '@/styles/style.css';

export default function NonogramMainCard() {
    return (
        <div className="flex justify-center items-center h-full relative">
            <div className="w-full sm:w-[50vh] md:w-[50vh] lg:w-[50vh] xl:w-[60vh] xl:h-[60vh] lg:h-[60vh] md:h-[60vh] sm:h-[60vh] h-[80vh] bg-white backdrop-blur-md backdrop-filter bg-opacity-20 rounded-xl shadow-lg p-6 z-10 mx-auto">
                <h1 className="text-center text-white text-2xl font-bold">🏆NONOGRAM</h1>

                <p className="text-center text-white text-lg font-semibold">Nonograms are logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden picture.</p>

                <div className="flex justify-center items-center mt-4 mr-3">
                    <button className="w-10 h-10 bg-red-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110"></button>
                    <button className="w-10 h-10 bg-green-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110"></button>
                    <button className="w-10 h-10 bg-blue-500 rounded-full ml-3 duration-200 hover:bg-opacity-60 hover:scale-110"></button>
                </div>

                <table className="mx-auto mt-4 border-collapse border-2 border-white">
                    <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i}>
                            {[...Array(5)].map((_, j) => (
                                <td key={j} className="border-2 border-white h-14 w-14 duration-200 hover:bg-white hover:bg-opacity-20"></td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Image src={myImage} alt="My Image" width={200} height={200} className="absolute bottom-[50px] sm:bottom-[110px] md:bottom-[100px] lg:bottom-[80px] xl:bottom-[60px] sm:translate-y-[-40px] right-0 z-20 lg:translate-y-[-70px]" />
        </div>
    );
};