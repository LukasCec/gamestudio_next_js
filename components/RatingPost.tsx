'use server'
import React from 'react';

interface RatingData {
    player: string;
    game: string;
    rating: number;
    ratedOn: string;
}

export async function postRating(data: RatingData): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:8080/api/rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
            mode: "no-cors"
        });

        if (!response.ok) {
            throw new Error("Failed to post rating");
            return false;
        }

        console.log("Rating posted successfully");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}