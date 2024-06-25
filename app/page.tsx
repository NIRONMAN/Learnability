"use client";
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

// Explicitly declaring the type of props as an empty object
type Props = {};

const Page: React.FC<Props> = (props) => {
  const router = useRouter();

  const handleRevisionNavigation = () => {
    const pathname = "/revising";
    const query = { sessionId: "new-Chat" }; // Ensure sessionId is a string
    const queryString = new URLSearchParams(query).toString();
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className=' bg-slate-500 h-screen flex justify-center items-center'>
      <Button 
        onClick={() => {
          router.push("/learning");
        }}
        color='blue'
      >
        Go to Chat Session
      </Button>
      <Button 
        color='yellow' 
        onClick={handleRevisionNavigation}
      >
        Go to Revision
      </Button>
    </div>
  );
};

export default Page;
