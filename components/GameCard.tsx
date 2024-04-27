import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface GameCardProps {
    link: string;
    name: string;
    imgLink: StaticImageData;
}

const GameCard: React.FC<GameCardProps> = ({ link, name, imgLink }) => {
    return (
        <Link className="group rounded-xl" href={link}>

                <div className="bg-gray-800 rounded-xl p-4 aspect-[1/1] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 group-hover:bg-gray-800 hover:shadow-lg z-30 flex items-center justify-center darken-on-hover ">
                    <h2 className="text-orange-400 absolute transition duration-300 text-xl font-bold opacity-0 group-hover:opacity-100 z-40">{name}</h2>
                    <Image src={imgLink} className="z-20" alt={name} layout="fill" objectFit="cover" />
                </div>

        </Link>
    );
};

export default GameCard;