"use client";
import Login from '@/app/Components/Login';
import ParticlsBackground from '@/app/Components/ParticlsBackground';
import Signup from '@/app/Components/Signup';
import SignupLoginText from '@/app/Components/SignupLoginText';
import { RootState } from '@/app/GlobalRedux/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {};

const SignupLogin = (props: Props) => {
  const isLogin=useSelector((state:RootState)=>state.auth.changeScene);

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
       <ParticlsBackground>
        
       </ParticlsBackground>
      <div id='gradient card'
  className="w-[60%]  h-[65%] flex rounded-3xl  shadow-2xl "
  style={{
    backgroundImage: isLogin
    ? 'linear-gradient(to bottom, rgba(74, 144, 226, 0.9), rgba(80, 227, 194, 0.9))'
    : 'linear-gradient(to bottom, rgba(74, 144, 226, 0.9), rgba(80, 227, 194, 0.9))',
    backdropFilter: 'blur(3px)',
         
}}
>

        <div
          className={` bg-white  w-[42%] h-[115%] relative bottom-[8%]  p-8 rounded-3xl shadow-xl transform transition-transform duration-500 ${
            isLogin ? 'translate-x-full left-20' : 'translate-x-0 left-10'
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
          className={`w-1/2 flex flex-col justify-start text-black transform transition-transform duration-500 ${
            isLogin ? '-translate-x-[78%]' : 'translate-x-[20%]'
          }`}
        >
          <SignupLoginText></SignupLoginText>
         
          
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;