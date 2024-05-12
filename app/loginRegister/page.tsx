'use client';
import React, { useState, useRef } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Navigation } from "@/components/ui/navigation";
import { onSubmit, getUser } from "@/components/Login";

export default function LoginRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const handleRegister = async () => {
        const result = await onSubmit({ username, password });
        console.log(result ? "Registration successful" : "Registration failed");
        if (formRef.current) {
            formRef.current.reset();
        }
        if (result) {
            console.log("Registration successful");
            localStorage.setItem('username', username);
            window.location.href = '/';
        }
        else {
            console.log("Registration failed");
            alert("Username already exists")
            window.location.href = '/loginRegister/';
        }
    };

    const handleLogin = async () => {
        const user = await getUser(username, password);
        console.log(user);
        if (formRef.current) {
            formRef.current.reset();
        }
        if(user){
            console.log("Login successful")
            localStorage.setItem('username', username);
            window.location.href = '/';
        }
        else{
            console.log("Login failed")
            alert("Username or password is incorrect");
        }
    };
    return (
        <>
            <Navigation />
            <AuroraBackground>
                <div className=" bg-gray-600 backdrop-blur-md backdrop-filter bg-opacity-20 rounded-2xl p-6 text-white font-bold z-40">
                    <h1 className="text-center text-orange-400">Login / Register</h1>

                    <form className="flex flex-col">
                        <label className="mt-3" htmlFor="username">Username</label>
                        <input
                            className="bg-gray-900 backdrop-blur-md backdrop-filter bg-opacity-40 text-sm p-3 rounded-2xl"
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label className="mt-3" htmlFor="password">Password</label>
                        <input
                            className="bg-gray-900 backdrop-blur-md backdrop-filter bg-opacity-40 text-sm mb-7 p-3 rounded-2xl"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            className="w-full bg-green-600 hover:bg-green-700 duration-500 mr-1 rounded p-3"
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            className="w-full bg-green-600 hover:bg-green-700 duration-500 mr-1 mt-2 rounded p-3"
                            type="button"
                            onClick={handleRegister

                        }
                        >
                            Register
                        </button>
                    </form>
                </div>
            </AuroraBackground>
        </>
    );
};