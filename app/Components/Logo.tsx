import React from 'react';
import Image from 'next/image';
import logo from "../../public/Learnability (GenAi) logo svg/Logo.svg"

const Logo: React.FC = () => {
  return (
    <div className="flex items-center py-0 my-0">
      <a className="block p-0 m-0">
        <Image  src={logo} alt="Learnability AI" layout="intrinsic" className="w-36" />
      </a>
    </div>
  );
};

export default Logo;
