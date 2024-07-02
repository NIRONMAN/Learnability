"use client"

import React, { useEffect, useState } from 'react'

import MermaidChart from '../Components/MermaidChart'
import chart from '../Components/chart'
import { useDispatch } from 'react-redux'
import { updateString } from '../GlobalRedux/Features/string/stringSlice'
import diagramSystemPrompt from '@/lib/diagramSystemPrompt'
import axios from 'axios'
import { Spin } from 'antd'

    type Props = {}
    
    const page = (props: Props) => {
        const [response,setResponse]=useState("")
        const [isLoading,setIsLoading]=useState(true);
        const parseContent = (content: string) => {
          try {
              // Remove Markdown formatting
              const sanitizedContent = content.replace(/```mermaid|```/g, '').trim();
              return sanitizedContent;
          } catch (error) {
              return null;
          }
      };
        useEffect(()=>{
            axios.post("api/diagram",{data:{prompt:`Classification of animal kingdom`,context:``,systemPrompt:diagramSystemPrompt}}).then(async (res)=>{
                    const finalData:string=await res.data.result;
                    console.log(typeof(finalData))
                     const parsed=parseContent(finalData);
                        setResponse(parsed)
                      console.log("this is parsed "+parsed)
                    setIsLoading(false)
            })

        },[])
      return (
<div className="flex justify-center items-center min-h-screen bg-gray-900 border-2 border-white ">
      {!isLoading?<MermaidChart chart={response} />:<Spin size='large'></Spin>}
    </div>    
    )
    }
    
    export default page

