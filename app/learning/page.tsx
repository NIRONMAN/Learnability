"use client"
import React,{useState,useEffect,useRef} from 'react'
import ChatBot,{} from '../Components/ChatBot'
import MessageList2 from '../Components/MessageList2'

import {Viewer,Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useSelector,useDispatch } from 'react-redux'
import type { RootState } from '../GlobalRedux/store'
import {showPdf,hidePdf,setPdf} from '../GlobalRedux/Features/counter/counterSlice'


type Props = {}

const pageofSession = (props: Props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dispatch = useDispatch()
  const show = useSelector((state:RootState)=>state.counter.value)
  const pdf = useSelector((state:RootState)=>state.counter.file)
  // console.log(show)

  const [isDragging,setIsDragging] =  useState<any>(false)
  const [leftPannelWidth, setLeftPannelWidth] = useState<any>(null)
  const [leftPannel, setLeftPannel] = useState<any>(null)
  const [rightPannelWidth, setRightPannelWidth] = useState<any>(null)
  const [rightPannel, setRightPannel] = useState<any>(null)
  const [splitterX,setSplitterX] = useState<any>(0)

  // const [showPdf,setShowPdf] = useState('hidden')
  // const [pdf,setPdfFile] = useState(null)
  

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
    // console.log('pdf global state',pdf)
    return ()=>{
      document.removeEventListener('mousemove',onMouseMove)
      document.removeEventListener('mouseup',onMouseUp)
    }
  },[isDragging])



  return (
    <div className='w-full flex flex-row'>
      <div className={`h-screen overflow-y-auto w-2/4 ${show? 'hidden' : ''}`} >

        {/* <h1></h1> */}
        {
          show?(
            <div>No PDF selected</div>
            
          ) : (
            pdf ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div style={{ height: '750px' }}>
                <Viewer
                  fileUrl={pdf}
                  plugins={[defaultLayoutPluginInstance]}
                  />
              </div>
            </Worker>
            ):(
              <div>There has been an error</div>
            )
          )
        }
      </div>
      <div className={`bg-gray-400 h-screen w-1 hover:cursor-col-resize ${show?'hidden':''}`} onMouseDown={onMouseDown}></div>
      <div className='w-full justify-end'>
        <ChatBot MessageList={MessageList2}></ChatBot>
      </div>
    </div>
  )
}

export default pageofSession