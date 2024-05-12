import React from "react";
import Image from 'next/image'; // Import the Image component from next/image
import myImage from "@/images/ui_yellow_book_game_icon.png"; // replace "myImage.jpg" with the name of your image
import nonogramImage from "@/images/nonogram_icon.png"; // replace "nonogram.png" with the name of your image
import lockImage from "@/images/lock.png"; // replace "lock.png" with the name of your image
import '@/styles/style.css';
import GameCard from "@/components/GameCard";


export default function MainCard() {
    return (
        <div className="flex justify-center items-center h-full relative"> {/* Add relative here */}
            <div className="w-full sm:w-[50vh] md:w-[50vh] lg:w-[50vh] xl:w-[60vh] xl:h-[60vh] lg:h-[60vh] md:h-[60vh] sm:h-[60vh] h-[80vh] bg-white backdrop-blur-md backdrop-filter bg-opacity-20 rounded-xl shadow-lg p-6 z-10 mx-auto"> {/* Add mx-auto here */}
                <h1 className="text-center text-white text-2xl font-bold">🏆Choose Your Game</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 justify-center  items-center mx-auto ml-8 sm:ml-2.5 md:ml-3 lg:ml-3 xl:ml-10"> {/* Add mx-auto here */}


                    <GameCard link="/games/nonogram/" name="Nonogram" imgLink={nonogramImage} />


                    <GameCard link="/link-to-lock-game" name="Coming Soon..." imgLink={lockImage} />
                </div>
            </div>
            <Image src={myImage} alt="My Image" width={200} height={200} className="absolute bottom-[50px] sm:bottom-[110px] md:bottom-[100px] lg:bottom-[80px] xl:bottom-[60px] sm:translate-y-[-40px] right-0 z-20 lg:translate-y-[-70px]" /> {/* Adjust bottom property here */}
        </div>
    );
};
