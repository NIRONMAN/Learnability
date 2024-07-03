"use client";
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setContextType, updateURL } from '../GlobalRedux/Features/string/stringSlice';

// Explicitly declaring the type of props as an empty object
type Props = {};

const Page: React.FC<Props> = (props) => {
 
  const router = useRouter();
  const [url,setUrl]=useState<string>("")
  const dispatch=useDispatch();

  const handleRevisionNavigation = () => {
    const pathname = "/revising";
    const query = { sessionId: "new-Chat" }; // Ensure sessionId is a string
    const queryString = new URLSearchParams(query).toString();
    router.push(`${pathname}?${queryString}`);
  };
  async function YtClick(){
    dispatch(updateURL(url))
    dispatch(setContextType("ytlink"));

    
}
  return (
    <div className=' bg-[#232323] border-2 h-full flex justify-center items-center flex-col gap-5 text-white'>
      <div className=' font-semibold text-lg'>Welcome to Learning !</div>
      <div className=' w-full'>
      <h2 className=' p-2 text-center'>Enter the URL of a Youtube video</h2>
      <div className='p-4 w-full flex justify-center items-center gap-2'>
      <Input 
      className='w-2/3' 
      onChange={(e)=>{
        setUrl(e.target.value)
      }}
      ></Input>
      <Button onClick={YtClick}>Submit</Button>
      
      </div>
      
      </div>
       or
      
      <div className=' w-full flex justify-evenly'>
      <Button 
        onClick={() => {
          router.push("/learning");
        }}
        color='blue'
      >
        Open a PDF
      </Button>
      {/* <Button 
        color='yellow' 
        onClick={handleRevisionNavigation}
      >
        I want to revise
      </Button> */}
      </div>
    </div>
  );
};

export default Page;
