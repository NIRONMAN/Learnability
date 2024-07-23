"use client";
import React from "react";
import Header from '../Components/Header';
import MainContent from '../Components/MainContent';
import ParticlsBackground from "../Components/ParticlsBackground";



const Page = () => {

   return (
    <div className="min-h-screen  flex flex-col">
      <ParticlsBackground/>
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        <MainContent />
      </div>
      <footer className="w-full p-4 flex justify-center items-center bg-gray-700">
        <p className="text-white text-center">© 2024 Learnability. All rights reserved.</p>
      </footer>

        
      
    </div>
  );
};

export default Page;
