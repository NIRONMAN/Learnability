"use client"
import revisionSystemPrompt from '@/lib/revisionSystemPrompt';
import { PaperClipOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useState } from 'react';

import { useSelector,useDispatch } from 'react-redux'
import type { RootState } from '../GlobalRedux/store'
import {showPdf,hidePdf,setPdf} from '../GlobalRedux/Features/counter/counterSlice'
import * as pdfjsLib from 'pdfjs-dist';

interface Message {
  content: string,
  role:string,
  id:string
}

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, data: { data: { prompt: string; context: string ;systemPrompt:string} }) => void;
  messages: Message[];
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setUpload: any
}

const InputFormCompo: React.FC<Props> = ({ handleInputChange, handleSubmit, input, messages, setUpload }) => {
  const systemPrompt=useSelector((state:RootState)=>state.string.value)
  const [noOfFiles, setNoOfFiles] = useState<number>(0);
  const dispatch = useDispatch()
  
  const uploadHandler :any= (e:any) => {

    setNoOfFiles(noOfFiles + 1)


    const file = e.file.originFileObj

    if(file.type!=="application/pdf"){
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload =async (eve)=>{
      const pdfData = eve.target?.result as string
      dispatch(setPdf(eve.target?.result as string))
      dispatch(showPdf())

      const loadingTask = pdfjsLib.getDocument({ data: atob(pdfData.split(',')[1]) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let fullText = '';

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent:any = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str ).join(' ');
        fullText += `${pageText} \n\n`;
      }

      console.log('Extracted Text:', fullText);
      
    }
    reader.onerror= (error)=>{
      console.log('error=',error)
    }
  ;}

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, {
            data: {
              systemPrompt:systemPrompt,
              prompt: input,
              context: JSON.stringify(
                messages.map((message: Message) => {
                  return message.content;
                }).join('\n')
              ),
            },
          });
        }}
        className="flex items-center justify-center w-full"
      >
        <div className="flex gap-3 items-center w-full">
          <input
            value={input}
            type="text"
            className="bg-[#2f2f2f] text-sm rounded-full border-2 border-[#2f2f2f] focus:border-blue-500 w-full focus:outline-none py-2 px-4 text-white"
            onChange={(e) => handleInputChange(e)}
            placeholder="Type your message..."
          />
          <div className="bg-[#3f3f3f] py-1 px-2 rounded-lg hover:cursor-pointer">
            <Upload onChange={uploadHandler} showUploadList={false}>
              <PaperClipOutlined style={{ color: 'white', fontSize: '1rem' }} />
            </Upload>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputFormCompo;
