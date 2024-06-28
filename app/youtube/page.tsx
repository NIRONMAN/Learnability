"use client"

import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateString } from '../GlobalRedux/Features/string/stringSlice';
import { Spin } from "antd"
import ChatBot from "../Components/ChatBot";
import MessageList from "../Components/MessageList2";
import youtubeSystemPrompt from "@/lib/youtubeSystemPrompt";
import ytdl from "ytdl-core";

export default function Form() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const videoID=ytdl.getURLVideoID(url)

    useEffect(() => {
        if (url) {
            axios.post("/api/extract", { url })
                .then((res) => {
                    console.log("API call successful");
                    dispatch(updateString(youtubeSystemPrompt + res.data.result.response.candidates[0].content.parts[0].text));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("API call failed", error);
                });
        } else {
            console.log("No URL provided");
        }
    }, [url]);

    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput } = useChat({
        api: "/api/v1",
        initialMessages: []
    });

    return (
        <div className="bg-gray-900 h-screen flex flex-col w-full">
            {!loading ? 
                <div className=" grid grid-cols-2">
                  <div className=" col-span-1">
                <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
                </div>
                  <div className=" col-span-1">
                <ChatBot
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                MessageList={MessageList}
                /> 
                </div>
                
                </div>
                : <Spin />
            }
        </div>
    );
}
