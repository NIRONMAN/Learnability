import React from 'react';
import Image from 'next/image';
import wholelogo from '../../public/Learnability (GenAi) logo svg/whole logo.svg';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center  py-1">
      <a className="block w-[10.5rem] ">
        <Image src={wholelogo} alt="Learnability AI" />
      </a>
    </div>
  );
};

export default Logo;
