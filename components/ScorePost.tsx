'use server'
import React from 'react';

interface ScoreData {
    player: string;
    game: string;
    points: number;
    playedOn: string;
}

export async function postScore(data: ScoreData): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:8080/api/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
            mode: "no-cors"
        });

        if (!response.ok) {
            throw new Error("Failed to post score");
            return false;
        }

        console.log("Score posted successfully");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}