'use client'
import React, {useState} from "react";
import gameStudioImage from "@/images/gamestudioLogo.png";
import Image from "next/image";
import Link from 'next/link';

import {onSubmit} from "@/components/Login";

interface SignUpData {
    username: string;
    password: string;
}


const logout = () => {
    localStorage.removeItem('username');

     window.location.href = '/loginRegister';
};

export const Navigation = () => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);


    const submitUser = async () => {
        try {
            const set = await onSubmit({ username: username,password: password });
            if (set) {
                console.log('user uploaded successfully!');

            } else {
                console.error('Failed to upload user.');
            }
        } catch (error) {
            console.error('Error uploading user:', error);
        }
    };


    const susername = localStorage.getItem('username');

    return (
        <div className="navigation absolute top-0 left-0 right-0 p-6 flex flex-row justify-between items-center z-10">
            <Link href="/" className="text-2xl font-bold hover:scale-105 duration-300">
                <div className="flex items-center">
                    <Image src={gameStudioImage} height="30" width="30" alt="Logo"></Image>
                    <span className="text-orange-400 ml-0">ame</span>
                    <span className="ml-0">Studio</span>
                </div>
            </Link>
            <div>
                {susername ? "👤"+susername +"  |": <Link href="/loginRegister/">Login/Register</Link>}
                {susername ? <button className="bg-orange-700 px-1 ml-3 py-1 text-center hover:bg-orange-800 duration-300 z-40 rounded-xl" onClick={logout}>Logout</button> : null}
            </div>
        </div>
    );
};