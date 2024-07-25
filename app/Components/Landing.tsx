"use client";
import React from 'react';
import Logo from './Logo';
import { setDark, setLight } from "@/app/GlobalRedux/Features/colours/coloursSlice";
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { Image } from 'antd';
import character from '../../public/Learnability (GenAi) logo svg/character.svg'


const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state: RootState) => state.colour.themeDark);

  return (
    <div>
      {/* Header Section */}
      <header className="w-full p-4 flex justify-between items-center bg-black shadow-white shadow-sm">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-2xl font-bold ml-0 text-custom-pink">AI</h1>
        </div>
        <nav className="text-white flex items-center space-x-4">
          {isDarkTheme ? (
            <SunOutlined onClick={() => dispatch(setLight())} />
          ) : (
            <MoonOutlined onClick={() => dispatch(setDark())} />
          )}
          <a href="#home" className="px-4 border-r border-white">Home</a>
          <a href="#about" className="px-4 border-r border-white">About Us</a>
          <a href="#contact" className="px-4">Contact</a>
        </nav>
      </header>
      
      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between  bg-white min-h-screen px-12">
  <div className="flex flex-col items-start space-y-4 max-w-xl -mt-36">
  <h2 className="text-lg font-semibold text-gray-600 border-2 border-black rounded-2xl p-1">Welcome to Learnability AI-Your Study Companion</h2>
    <h1 className="text-5xl font-serif font-bold text-black leading-tight">Your Path to Academic Excellence </h1>
    <p className="text-gray-700 text-md max-w-lg">At Learnability, we understand that every student is unique, and so are their learning needs. Our mission is to match students with experienced and caring tutors who will provide personalized support, inspire confidence, and ignite a passion for learning.</p>
    <div className="flex space-x-4">
      <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-500">Get Started</button>
    </div>
  </div>
  <div className="flex flex-col items-center mt-8 md:mt-0">
  <Image src={character} alt="Boy Studying" className="w-full  max-w-md" />
        </div>
</div>

{/* Features Section */}
<div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-purple-500 text-white rounded-full p-4 mb-4">
                {/* Add feature icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Personalized Learning</h3>
              <p className="text-gray-600 text-center mt-2">Personalized tutor to fit each student&apos;s unique needs.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-500 text-white rounded-full p-4 mb-4">
                {/* Add feature icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Master Your Knowledge</h3>
              <p className="text-gray-600 text-center mt-2">Revision Section: Revise and test with Our Interactive Tutor.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-500 text-white rounded-full p-4 mb-4">
                {/* Add feature icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Boost Your Retention</h3>
              <p className="text-gray-600 text-center mt-2">Flashcard Section: Interactive Flashcards for Efficient Learning.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-500 text-white rounded-full p-4 mb-4">
                {/* Add feature icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">See It, Remember It</h3>
              <p className="text-gray-600 text-center mt-2">Mindmap Section: Study Smarter, Not Harder.</p>
            </div>
          </div>
        </div>
      </div>

    {/* Additional Section */}
       <div className="bg-white py-8">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="lg:text-center">
           <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Tutor Very Engaging And Strategic/Effective</h2>
           <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
             Learn more about our Personalised Tutor
           </p>
           <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
             View more
           </p>
         </div>
       </div>
     </div>

     {/* Footer Section */}
     <footer className="bg-black text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p>&copy; 2024 Learnability AI. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#privacy" className="text-white">Privacy Policy</a>
            <a href="#terms" className="text-white">Terms of Service</a>
            <a href="#social" className="text-white">Social Media</a>
          </div>
        </div>
      </footer>
     </div>
  );
};

export default Landing;
