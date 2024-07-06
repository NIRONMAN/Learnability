"use client"
import { Button } from 'antd'
import input from 'postcss/lib/input'
import React, { useEffect } from 'react'
import ChatBot from '../Components/ChatBot'
import HistoryCompo from '../../other/HistoryCompo'
import MessageList from '../Components/MessageList'
import Suggestions from '../Components/Suggestions'
import { SuggestionsProvider } from '../Components/SuggestionsContext'
import { useChat } from "@ai-sdk/react";
import youtubeSystemPrompt from '@/lib/youtubeSystemPrompt'
import axios from 'axios'
import { updateString, setIsContextSet } from '../GlobalRedux/Features/string/stringSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../GlobalRedux/store'
import revisionSystemPrompt from '@/lib/revisionSystemPrompt'

type Props = {}

const page = (props: Props) => {
    const dispatch=useDispatch()
    const contextType=useSelector((state:RootState)=>state.string.contextType)
    const pdfObject=useSelector((state:RootState)=>state.counter.file)
    const url=useSelector((state:RootState)=>state.string.url)

    useEffect(() => {
        if(contextType==="ytlink"){
        if (url) {
                axios.post("/api/extract", { url })
                    .then((res) => {
                        console.log("API call successful");
                        dispatch(updateString(revisionSystemPrompt +"Following is the context of the youtube video: "+ res.data.result.response.candidates[0].content.parts[0].text));
                        dispatch(setIsContextSet());
                    })
                    .catch((error) => {
                        console.error("API call failed", error);
                    });
            } else {
                console.log("No URL provided");
            }
        }
        else if(contextType==="pdf"){
            axios.post("/api/pdfExtract", { data: { objectUrl: pdfObject } }).then((res) => {
                dispatch(updateString(revisionSystemPrompt + "This is the Context:" + res.data.text))
                dispatch(setIsContextSet())
              })
        }
        }, [contextType]);
    
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages,setInput } = useChat({
        api: "api/v1",
        // initialMessages: initialMessages
      });
  return (
    <SuggestionsProvider>
      <div className="h-screen bg-[#121212] grid grid-cols-5 text-white">
        <div className="col-span-1 bg-[#333333] flex flex-col items-center">
          {/* <h1 className='p-4'>History</h1>
          <Button onClick={handleCreateSession}>Create New Chat</Button>
          <HistoryCompo arr={historyvar} onHistoryClick={handleHistoryClick} /> */}
        </div>
        <ChatBot 
          MessageList={MessageList}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          messages={messages}
          isLoading={isLoading}
        />

        <div className="col-span-1 bg-[#333333] flex flex-col items-center">
          <h1 className='p-4'>Suggestions</h1>
          <div className='flex flex-grow flex-col gap-2'>
            <Button type='dashed' onClick={()=>setInput("Skip this Question")}>Skip this Question</Button>
            <Button type='dashed' onClick={()=>setInput("Explain further")}>Explain further</Button>
            
            <Button type='dashed' onClick={()=>setInput("Move to next topic")}>Move to next topic</Button>
          </div>
          <Suggestions />
        </div>
      </div>
    </SuggestionsProvider>
  )
}

export default page