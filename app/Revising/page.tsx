"use client";
import React, { useEffect, useState } from 'react';
import ChatBot from '../Components/ChatBot';
import { SuggestionsProvider } from '../Components/SuggestionsContext';
import Suggestions from '../Components/Suggestions';
import MessageList from '../Components/MessageList';
import { Button } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useChat } from "@ai-sdk/react";
import HistoryCompo from '../Components/HistoryCompo';
import { createSession, getHistory, getSession, updateHistory, updateSession } from '@/utils/functions';

interface historyType {
  title: string;
  sessionId: string;
}

const RevisingPage = () => {
  const router = useRouter();
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const [historyvar, setHistory] = useState<historyType[]>([]);
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages,setInput } = useChat({
    api: "api/v1",
    initialMessages: initialMessages
  });
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
 useEffect(()=>{
  getHistory().then((res)=>{
    console.log("in get"+res)
    if(res){
      setHistory(res)
    }
  })
 },[])
  // Fetch session data when sessionId changes
  useEffect(() => {
   
    if (sessionId && sessionId !== "new-Chat") {
      getSession(sessionId).then((response) => {
        setInitialMessages(response);
        setMessages(response);
      });
    } else {
      setInitialMessages([]);
      setMessages([]);
    }
  }, [sessionId, setMessages]);

  // Handle session creation
  const handleCreateSession = async () => {
    if (!sessionId || sessionId === "new-Chat") {
      // Create a new session
      const newSessionId = await createSession({ messages: messages });
      if (newSessionId) {
        setHistory((prev) => [...prev, { sessionId: newSessionId, title: "First Chat" }])
        updateHistory([...historyvar,{ sessionId: newSessionId, title: "First Chat" }]).then((res)=>{
          console.log("update history "+res)
        })
      } else {
        console.log("Failed to create a new session");
      }
    } else {
      
      updateSession({sessionId,messages}).then(()=>{
        console.log("Session updated successfully")
      })
    }
    const pathname = "/revising";
    const query = { sessionId: "new-Chat" }; 
    const queryString = new URLSearchParams(query).toString();
    setMessages([]);
    router.replace(`${pathname}?${queryString}`);
  };
  

  // Handle history click
  const handleHistoryClick = (sessionId: string) => {
    const pathname = "/revising";
    const query = { sessionId: sessionId }; 
    const queryString = new URLSearchParams(query).toString();
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <SuggestionsProvider>
      <div className="h-screen bg-[#121212] grid grid-cols-5 text-white">
        <div className="col-span-1 bg-[#333333] flex flex-col items-center">
          <h1 className='p-4'>History</h1>
          <Button onClick={handleCreateSession}>Create New Chat</Button>
          <HistoryCompo arr={historyvar} onHistoryClick={handleHistoryClick} />
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
  );
}

export default RevisingPage;
