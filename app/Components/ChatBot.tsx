import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import MessageList from "../Components/MessageList";
import { PaperClipOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

// Define an interface for the props
interface ChatBotProps {
  setupload: (value: any) => void; // Assuming setupload is a function that takes a boolean
}

export default function ChatBot(props: ChatBotProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "api/v1" });
  const [noOfFiles, setNoOfFiles] = useState(0);

  console.log(props);
  const uploadHandler = (e: any) => {
    console.log(e.file);
    setNoOfFiles(noOfFiles + 1);
    const file = e.file;
    props.setupload(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // Update state correctly using setState if this component had state for fileName and fileContent
      // Since this is a functional component, consider using another state variable instead of this.setState
      console.log(reader.result);
    };
    reader.onerror = () => {
      console.log('file error', reader.error);
    };

    console.log(reader.result);
  };

  return (
    <div className="h-screen flex flex-col bg-[#212121] items-center">
      <div className="flex-grow overflow-auto w-full max-w-3xl p-8">
        <MessageList arr={messages} />
      </div>
      <div className="w-full max-w-2xl p-4 bg-[#212121]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e, {
              data: {
                prompt: input,
                context: JSON.stringify(messages.map((message) => {
                  return message.content;
                }).join("\n")),
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
            <div className="bg-[#3f3f3f] py-1 px-2 rounded-lg hover:cursor-pointer">
              <Upload onChange={uploadHandler} showUploadList={false}>
                <PaperClipOutlined style={{ color: 'white', fontSize: '1rem' }} />
              </Upload>
            </div>
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
