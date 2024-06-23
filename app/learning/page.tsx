"use client"
import React,{useState,useEffect,useRef} from 'react'
import ChatBot from '../Components/ChatBot'
import MessageList2 from '../Components/MessageList2'

type Props = {}

const pageofSession = (props: Props) => {

  const [isDragging,setIsDragging] =  useState<any>(false)
  const [leftPannelWidth, setLeftPannelWidth] = useState<any>(null)
  const [leftPannel, setLeftPannel] = useState<any>(null)
  const [rightPannelWidth, setRightPannelWidth] = useState<any>(null)
  const [rightPannel, setRightPannel] = useState<any>(null)
  const [splitterX,setSplitterX] = useState<any>(0)

  const [showPdf,setShowPdf] = useState<any>('hidden')
  

  const onMouseDown = ((e:any)=>{
    setIsDragging(true)
    // console.log(e)
    let pEle = e.target.previousElementSibling
    let nEle = e.target.nextElementSibling

    setLeftPannel(pEle)
    setRightPannel(nEle)
    setLeftPannelWidth(pEle.offsetWidth)
    setRightPannelWidth(nEle.offsetWidth)

    setSplitterX(e.pageX)
  })
  const onMouseMove = ((e:any)=>{
    let mx = e.pageX - splitterX
    try{

      leftPannel.style.width = (leftPannelWidth + mx)+'px'
      rightPannel.style.width = (rightPannelWidth - mx)+'px'
    }catch(err){
      console.log(err)
    }
  })
  const onMouseUp = ((e:any)=>{
    setIsDragging(false)
  })

  useEffect(()=>{
    if(isDragging){
      document.addEventListener('mousemove',onMouseMove)
      document.addEventListener('mouseup',onMouseUp)
    }

    return ()=>{
      document.removeEventListener('mousemove',onMouseMove)
      document.removeEventListener('mouseup',onMouseUp)
    }
  },[isDragging])


  return (
    
    <div className='w-full flex flex-row'>
      <div className={`h-full ${showPdf}`}>
        <h1 className=' text-white'>Hello, world!</h1>
      </div>
      <div className={`bg-gray-400 h-screen w-1 hover:cursor-col-resize ${showPdf}`} onMouseDown={onMouseDown}></div>
      <div className='h-full w-full justify-end'>
        {/* <ChatBot setupload={setShowPdf}></ChatBot> */}
        <ChatBot MessageList={MessageList2}></ChatBot>
      </div>
    </div>
  )
}

export default pageofSession