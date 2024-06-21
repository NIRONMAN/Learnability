import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import MessageList from "../Components/MessageList";
import { PaperClipOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import InputFormCompo from "./InputFormCompo";




export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "api/v1" });
  return (
    <div className="h-screen flex flex-col bg-[#212121] items-center">
      <div className="flex-grow overflow-auto w-full max-w-3xl p-8">
        <MessageList arr={messages} />
      </div>
      <div className="w-full max-w-2xl p-4 bg-[#212121]">
        <InputFormCompo 
        messages={messages} 
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setUpload={()=>{}}
        ></InputFormCompo>
      </div>
    </div>
  );
}
