"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSession, sessionProps } from '@/utils/functions';
import FlipCard from '@/app/Components/flashcardComponents/FlipCard';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { user, isLoadingCookie } = useSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const userId = user?.userId;
  const dispatch = useDispatch();
  const [response, setResponse] = useState<{ question: string, answer: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardExiting, setIsCardExiting] = useState(false);
  const [currIndex,setIndex] = useState(0)
  const [queReset,setQuesReset] = useState(false)

  useEffect(() => {
    if (!isLoadingCookie && !user) {
      router.replace("/signup-login");
    }
  }, [isLoadingCookie, user, router]);

  const [sessionData, setSessionData] = useState<sessionProps>({
    context: "",
    messages: [],
    sessionType: "",
    contextType: "",
    sessionTitle: "",
    fileUrl: "",
  });

  useEffect(() => {
    if (sessionId && userId) {
      getSession(sessionId, userId).then((response: sessionProps) => {
        setSessionData(response);
      });
    }
  }, [sessionId, userId]);

  const parseContent = (content: string) => {
    try {
      // Remove Markdown formatting
      const sanitizedContent = content.replace(/```mermaid|```/g, '').trim();
      return sanitizedContent;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (sessionData.context) {
      axios.post("api/flashCardExtract", { context: sessionData.context }).then(async (res) => {
        const finalData: string = await res.data.result;
        const parsed = JSON.parse(finalData);
        setResponse(parsed);
        setIsLoading(false);
      });
    }
  }, [sessionData]);


  const handleExit = () => {
    setIsCardExiting(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % response.length);
  };


  const handleCardSelect = (index: number) => {
    setCurrentCardIndex(index);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 border-2 border-white">
      {!isLoading ? (
        <>
          <FlipCard content={isCardExiting ? '' : response[currentCardIndex]} resetToQuestion={queReset} onExit={handleExit} />
          <button onClick={()=>{
            if(currIndex>=0){
            setIndex(currIndex-1)
            setCurrentCardIndex(currIndex-1)
            setQuesReset(true)}
          }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Prev</button>
          <button onClick={()=>{
            if(currIndex <= response.length){
            setIndex(currIndex+1)
            setCurrentCardIndex(currIndex+1)
            setQuesReset(true)}
          }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Next</button>

        </>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default Page;
