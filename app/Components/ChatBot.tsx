import React, { useState } from "react";
import InputFormCompo from "./InputFormCompo";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import AllInputCompo from "./AllInputCompo";

export default function ChatBot({MessageList,messages,input,handleInputChange,handleSubmit,isLoading}) {
  const isContextSet=useSelector((state:RootState)=>state.string.isContextSet)

  return (
    <div className="h-screen flex flex-col bg-[#232323] items-center col-span-3">
        <div className="flex-grow overflow-auto w-full max-w-3xl p-8">
         {isContextSet? <MessageList arr={messages} />:<AllInputCompo></AllInputCompo>}
        </div>
        {isLoading?<Spin></Spin>:null}
        <div className="w-full max-w-3xl p-4 bg-[#232323]">
          <InputFormCompo
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setUpload={() => {}}
          ></InputFormCompo>
        </div>
      </div>
  );
}






