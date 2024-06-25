import revisionSystemPrompt from '@/lib/revisionSystemPrompt';
import { PaperClipOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useState } from 'react';

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
  const [noOfFiles, setNoOfFiles] = useState<number>(0);

  const uploadHandler :any= (e: React.ChangeEvent<unknown>) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    // console.log(event.target.files?.[0]);
    if (event.target.files && event.target.files.length > 0) {
      setNoOfFiles(noOfFiles + 1);
      const file = event.target.files[0];
      setUpload(true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.onerror = () => {
        console.log('file error', reader.error);
      };
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, {
            data: {
              systemPrompt:revisionSystemPrompt,
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
