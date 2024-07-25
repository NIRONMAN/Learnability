import React from 'react';
import Logo from './Logo';
import { setDark, setLight } from "@/app/GlobalRedux/Features/colours/coloursSlice";
import {SunOutlined ,MoonOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';


const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state:RootState)=> state.colour.themeDark)
  return (
    
    <header className="w-full p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Logo />
        <h1 className="text-3xl font-bold ml-2 text-custom-pink">AI</h1>
      </div>
      <nav className="text-white flex items-center space-x-4">
      {isDarkTheme?<SunOutlined onClick={()=>{
                dispatch(setLight())
              }}/>: <MoonOutlined onClick={()=>{
                dispatch(setDark())
              }}/>}
        <a href="#home" className="px-4 border-r border-white">Home</a>
        <a href="#about" className="px-4 border-r border-white">About Us</a>
        <a href="#contact" className="px-4">Contact</a>
      </nav>
    </header>
    
    
  );
};

export default Header;
