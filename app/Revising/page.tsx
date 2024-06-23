//Note
//This is a page where the user is Revising the content so this does not have to show the pdf
//this will have the question answer format only and that related suuff
"use client"
import React from 'react'
import ChatBot from '../Components/ChatBot'
import { SuggestionsProvider } from '../Components/SuggestionsContext'
import Suggestions from '../Components/Suggestions'
import MessageList from '../Components/MessageList'

type Props = {}

const page = (props: Props) => {
  return (
    <SuggestionsProvider >

<div className="h-screen bg-[#121212] grid grid-cols-5 text-white">
      {/* First column */}
      <div className="col-span-1 bg-[#333333] flex justify-center "><h1>History</h1></div>

      {/* Second column - Main content area */}
      <ChatBot MessageList={MessageList}></ChatBot>

      {/* Third column */}
      <div className="col-span-1 bg-[#333333] flex flex-col items-center"><h1>Suggestions</h1>
      <Suggestions></Suggestions>
      </div>
    </div>
    </SuggestionsProvider>
  )
}

export default page

