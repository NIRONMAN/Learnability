"use client"
import React, { useEffect } from 'react'
import { useChat } from "@ai-sdk/react";
import ChatBot from '../../app/Components/ChatBot';
import YtVidRenderer from '../../app/learningComponents/YtVidRenderer';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/GlobalRedux/store';
import LMessageList from '../../app/learningComponents/LMessageList';
import PDFFileHandler from '../../app/learningComponents/PDFFileHandler';

type Props = {
    
}

const page = (props: Props) => {
  
  const url=useSelector((state:RootState)=>state.string.url);
  const contextType=useSelector((state:RootState)=>state.string.contextType)
  const isContextSet=useSelector((state:RootState)=>state.string.isContextSet)
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages,setInput } = useChat({
        api: "api/v1",
        initialMessages: []
      });
      console.log("context tyope "+contextType)
  return (
    <div className='h-full grid grid-cols-2 bg-[#232323]'>
      
        <div className={`h-full ${isContextSet?"col-span-1":"hidden"}`}>
          {(contextType==="ytlink")&&<YtVidRenderer url={url} ></YtVidRenderer>}
          {(contextType==="pdf")&&<PDFFileHandler></PDFFileHandler>}
        </div>
        <div className={` ${isContextSet?"col-span-1":" col-span-2"}`}>
        <ChatBot 
          MessageList={LMessageList}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          messages={messages}
          isLoading={isLoading}
        /> </div>
    </div>
  )
}

export default page