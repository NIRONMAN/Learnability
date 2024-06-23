import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import InputFormCompo from "./InputFormCompo";

export default function ChatBot({MessageList}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/v1",
  });

  return (
    <div className="h-screen flex flex-col bg-[#232323] items-center col-span-3">
        <div className="flex-grow overflow-auto w-full max-w-3xl p-8">
          <MessageList arr={messages} />
        </div>
        <div className="w-full max-w-3xl p-4 bg-[#232323]">
          <InputFormCompo
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setUpload={() => {}}
          ></InputFormCompo>
        </div>
      </div>
  );
}






