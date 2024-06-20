"use client"
import React,{useState,useEffect,useRef} from 'react'
import ChatBot from '../Components/ChatBot'

type Props = {}

const page = (props: Props) => {

  const [isDragging,setIsDragging] =  useState(false)
  const [leftPannelWidth, setLeftPannelWidth] = useState(null)
  const [leftPannel, setLeftPannel] = useState(null)
  const [rightPannelWidth, setRightPannelWidth] = useState(null)
  const [rightPannel, setRightPannel] = useState(null)
  const [splitterX,setSplitterX] = useState(0)

  const [showPdf,setShowPdf] = useState('hidden')
  

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
        <h1>Hello, world!</h1>
      </div>
      <div className={`bg-gray-400 h-screen w-1 hover:cursor-col-resize ${showPdf}`} onMouseDown={onMouseDown}></div>
      <div className='h-full w-full justify-end'>
        <ChatBot setupload={setShowPdf}></ChatBot>
      </div>
    </div>
  )
}

export default page