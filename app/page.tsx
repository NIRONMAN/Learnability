"use client"
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

// Explicitly declaring the type of props as an empty object
type Props = {};

const Page: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <div className=' bg-slate-500 h-screen flex justify-center items-center'>
      <Button 
        onClick={() => {
          router.push("/chat-session");
        }}
        color='blue'
      >
        Go to Chat Session
      </Button>
    </div>
  );
};

export default Page;
