'use server'
import React from 'react';

interface SignUpData {
    username: string;
    password: string;
}
export async function getUser(username: string, password: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/${username}`);

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        const user = await response.json();
        if(user.password !== password){
            throw new Error("Password does not match");
        }
        else {
            console.log(user);
            return user;
        }

    } catch (error) {
        console.error(error);
    }
}
export async function onSubmit(data: SignUpData):Promise<boolean>   {
    try {
        const response = await fetch("http://localhost:8080/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
            mode: "no-cors"
        });

        console.log("Response", response);
        console.log("Data", data);

        if (!response.ok) {
            throw new Error("Failed to create a user");
            return false;
        }

        // Check if response body is empty
        const text = await response.text();
        const user = text ? JSON.parse(text) : null;

        // store user to the store


        console.log(user);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}


