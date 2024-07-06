"use client";
import { Button, Input, Spin, Upload } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContextType, updateURL } from '../GlobalRedux/Features/string/stringSlice';
import { setPdf } from '../GlobalRedux/Features/counter/counterSlice';
import { PaperClipOutlined } from '@ant-design/icons';
import { RootState } from '../GlobalRedux/store';

// Explicitly declaring the type of props as an empty object
type Props = {};

const Page: React.FC<Props> = (props) => {
 
  const router = useRouter();
  const [url,setUrl]=useState<string>("")
  const dispatch=useDispatch();
  const contextType=useSelector((state:RootState)=>state.string.contextType)

  
  async function YtClick(){
    dispatch(updateURL(url))
    dispatch(setContextType("ytlink"));

    
}
const uploadHandler :any= (e:any) => {
  const file = e.file.originFileObj
  if(file.type!=="application/pdf"){
    alert("Open a PDF type format")
    console.log("Type not supported")
  }
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload =async (eve)=>{
    const pdfData = eve.target?.result as string
    
    dispatch(setPdf(pdfData))
    dispatch(setContextType("pdf"))
   }
;}
  return (
    <div className=' bg-[#232323] border-2 h-full flex justify-center items-center flex-col gap-5 text-white'>
      {contextType?<Spin></Spin>:<>
        <div className=' font-semibold text-lg'>Welcome to Learning !</div>
      <div className=' w-full'>
      <h2 className=' p-2 text-center'>Enter the URL of a Youtube video</h2>
      <div className='p-4 w-full flex justify-center items-center gap-2'>
      <Input 
      className='w-2/3' 
      onChange={(e)=>{
        setUrl(e.target.value)
      }}
      ></Input>
      <Button onClick={YtClick}>Submit</Button>
      
      </div>
      
      </div>
       or
      
      <div className=' w-full flex justify-evenly'>
      <Upload onChange={uploadHandler} showUploadList={false}>
          <Button icon={<PaperClipOutlined style={{ color: 'black', fontSize: '1rem' }} />
}>Open a PDF</Button>
             
              
            </Upload>
     
      </div>
      </>}
    </div>
  );
};

export default Page;
