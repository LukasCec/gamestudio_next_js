import React from "react";
import gameStudioImage from "@/images/gamestudioLogo.png";
import Image from "next/image";
import Link from 'next/link';

export const Navigation = () => {
    return (
        <div className="navigation absolute top-0 left-0 right-0 p-6 flex flex-row justify-between items-center z-10">
            <Link href="/" className="text-2xl font-bold hover:scale-105 duration-300">
                    <div className="flex items-center">
                        <Image src={gameStudioImage} height="30" width="30" alt="Logo"></Image>
                        <span className="text-orange-400 ml-0">ame</span>
                        <span className="ml-0">Studio</span>
                    </div>
            </Link>
            <p className="m-1 text-gray-400">Your Gaming Hub</p>
        </div>
    );
};