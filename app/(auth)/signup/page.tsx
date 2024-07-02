"use client";
import Login from '@/app/Components/Login';
import Signup from '@/app/Components/Signup';
import SignupLoginText from '@/app/Components/SignupLoginText';
import { RootState } from '@/app/GlobalRedux/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {};

const SignupLogin = (props: Props) => {
  const isLogin=useSelector((state:RootState)=>state.auth.value);

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1457276587196-a9d53d84c58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")' }}
    >
      <div
  className="w-[80%] md:w-[60%] lg:w-[50%] h-[70%] flex rounded-lg  shadow-lg"
  style={{
    backgroundImage: isLogin
      ? 'linear-gradient(to bottom, rgba(64, 230, 210, 0.9), rgba(0, 10, 300, 0.9))'
      : 'linear-gradient(to bottom, rgba(64, 224, 208, 1.1), rgba(0, 0, 200, 0.8))'
  }}
>

        <div
          className={`bg-white w-full md:w-1/2 h-[115%] relative bottom-[8%]  p-8 rounded-lg shadow-md transform transition-transform duration-500 ${
            isLogin ? 'translate-x-full right-10' : 'translate-x-0 left-10'
          }`}
        >
          {!isLogin ? (
          // first componenet
           <Login></Login>
          ) : (
          //seconde component 
            <>
              <Signup></Signup>
            </>
          )}
        </div>
        <div
          className={`w-full md:w-1/2 flex flex-col justify-start text-black transform transition-transform duration-500 ${
            isLogin ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <SignupLoginText></SignupLoginText>
         
          
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
