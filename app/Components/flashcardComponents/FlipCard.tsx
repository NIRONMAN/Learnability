
import React, { useState } from 'react';
import { useEffect } from 'react';

type Props = {
  content: object;
  onExit: () => void;
  resetToQuestion: boolean;
};

const FlipCard = ({ content, onExit ,resetToQuestion}: Props) => {

  const [isExiting, setIsExiting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(true);
  const [width, setWidth] = useState('16rem'); // Initial width

  const flip = () => {
    if (width === '0') {
      setWidth('16rem'); // Set width to the original width (16rem = w-64)
    } else {
      setWidth('0'); // Set width back to 0 before flipping
      if(resetToQuestion){
        setIsFlipped(!isFlipped)
      }
      setTimeout(() => {
        setIsFlipped(!isFlipped);
        setWidth('16rem'); // Revert to original width after the transition
      }, 500);
    }
  };

  useEffect(()=>{
    setIsFlipped(true)
  },[content])

  return (
    <div
      className="relative flex justify-center items-center h-64 bg-transparent transition-all duration-500 mx-auto"
      style={{ width, perspective: '1500px' }} // Increased perspective for more 3D effect
      onClick={flip}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {isFlipped?<div className="absolute w-full h-full bg-white backface-hidden flex justify-center items-center border border-gray-300 rounded-lg shadow-2xl text-xl font-bold p-4 transform rotate-y-0 text-black">
          {content.question}
        </div>:
        <div className="absolute w-full h-full overflow-hidden bg-purple-600 backface-hidden flex justify-center items-center border border-gray-300 rounded-lg shadow-2xl text-xl font-bold text-white p-4 transform rotate-y-180">
          {content.answer}
        </div>}
      </div>
    </div>
  );
};

export default FlipCard;
