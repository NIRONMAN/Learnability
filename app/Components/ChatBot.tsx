"use client";

import React from "react";
import { useChat } from "@ai-sdk/react";
import MessageList from "../Components/MessageList";

export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "api/v1" });

  return (
    <div className="h-screen flex flex-col bg-[#212121] items-center">
      <div className=" flex-grow overflow-auto w-full max-w-3xl p-8">
        <MessageList arr={messages} />
      </div>
      <div className="w-full max-w-2xl p-4 bg-[#212121]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e, {
              data: {
                prompt: input,
                context:JSON.stringify(messages.map((message)=>{
                  return message.content;
                }).join("\n"))
              },
            });
          }}
          className="flex items-center justify-center w-full"
        >
          <div className="flex gap-3 items-center w-full">
            <input
              value={input}
              type="text"
              className="bg-[#2f2f2f] text-sm rounded-full border-2 border-[#2f2f2f] focus:border-blue-500 w-full focus:outline-none py-2 px-4 text-white"
              onChange={(e) => handleInputChange(e)}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
