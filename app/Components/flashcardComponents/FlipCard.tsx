import React, { useState } from 'react';

type Props = {};

const FlipCard = (props: Props) => {
  const res = {
    que: 'question',
    ans: 'answer',
  };
  const [isFlipped, setIsFlipped] = useState(false);
  const [width, setWidth] = useState('0'); // Initial width

  const flip = () => {
    if (width === '0') {
      setWidth('16rem'); // Set width to the original width (16rem = w-64)
    } else {
      setWidth('0'); // Set width back to 0 before flipping
      setTimeout(() => {
        setIsFlipped(!isFlipped);
        setWidth('16rem'); // Revert to original width after the transition
      }, 500);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-64 bg-white transition-all duration-500"
      style={{ width, perspective: '1000px' }}
      onClick={flip}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        {isFlipped?<div className={`absolute w-full h-full bg-white flex justify-center items-center ${isFlipped ? 'backface-hidden transform rotate-y-180' : 'backface-hidden'}`}>
          {res.que}
        </div>:
        <div className={`absolute w-full h-full bg-[#800cb6] flex justify-center items-center ${isFlipped ? 'backface-hidden' : 'backface-hidden transform rotate-y-180'}`}>
          {res.ans}
        </div>}
      </div>
    </div>
  );
};

export default FlipCard;
