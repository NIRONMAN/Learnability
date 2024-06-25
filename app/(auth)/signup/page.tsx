"use client"
import React, { useState } from 'react';

type Props = {};

const Signup = (props: Props) => {
  const [moveCard, setMoveCard] = useState(false);

  const handleButtonClick = () => {
    setMoveCard(!moveCard);
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1457276587196-a9d53d84c58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")' }}
    >
      <div className="bg-teal-500 w-[50%] h-[60%] flex rounded-lg ">
        <div
          className={`bg-white w-1/2 h-[120%] rounded-lg relative bottom-10 left-10 transform transition-transform duration-500 ${
            moveCard ? 'translate-x-60' : ''
          }`}
        >
          card
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className="absolute bottom-10 bg-teal-700 text-white py-2 px-4 rounded"
      >
        
        Login
      </button>
    </div>
  );
};

export default Signup;
