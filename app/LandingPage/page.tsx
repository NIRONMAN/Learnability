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
      
    </div>
  );
};

export default Page;
