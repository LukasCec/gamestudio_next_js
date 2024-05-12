'use server'
import React from 'react';

interface CommentData {
    player: string;
    game: string;
    comment: string;
    commentedOn: string;
}

export async function postComment(data: CommentData): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:8080/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
            mode: "no-cors"
        });

        if (!response.ok) {
            throw new Error("Failed to post comment");
            return false;
        }

        console.log("Comment posted successfully");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}