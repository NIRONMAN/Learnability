"use client"
import React, { useState, useEffect } from 'react';
import ChatBot from '../Components/ChatBot';
import { Menu, Dropdown } from 'antd';
import { useChat } from "@ai-sdk/react";

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../GlobalRedux/store';
import learningSystemPrompt from '@/lib/learningSystemPrompt';
import { updateString } from '../GlobalRedux/Features/string/stringSlice';
import LMessageList from '../learningComponents/LMessageList';

type Props = {}

const PageOfSession = (props: Props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

 
  useEffect(()=>{
    dispatch(updateString(learningSystemPrompt))

  },[])
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "api/v1",
    initialMessages: []
  });
  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.counter.value);
  const pdf = useSelector((state: RootState) => state.counter.file);

  const [isDragging, setIsDragging] = useState(false);
  const [leftPannelWidth, setLeftPannelWidth] = useState(null);
  const [leftPannel, setLeftPannel] = useState(null);
  const [rightPannelWidth, setRightPannelWidth] = useState(null);
  const [rightPannel, setRightPannel] = useState(null);
  const [splitterX, setSplitterX] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setIsDragging(true);
    let pEle = e.target.previousElementSibling;
    let nEle = e.target.nextElementSibling;

    setLeftPannel(pEle);
    setRightPannel(nEle);
    setLeftPannelWidth(pEle.offsetWidth);
    setRightPannelWidth(nEle.offsetWidth);
    setSplitterX(e.pageX);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    let mx = e.pageX - splitterX;
    try {
      leftPannel.style.width = (leftPannelWidth + mx) + 'px';
      rightPannel.style.width = (rightPannelWidth - mx) + 'px';
    } catch (err) {
      console.log(err);
    }
  };

  const onMouseUp = (e) => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const handleSelection = (event) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();
      if (selectedText) {
        setSelectedText(selectedText);
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        setMenuPosition({ x: rect.left + window.scrollX, y: rect.bottom + window.scrollY });
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection);

    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => alert(`Action 1 on: ${selectedText}`)}>
        Explain term
      </Menu.Item>
      <Menu.Item key="2" onClick={() => alert(`Action 2 on: ${selectedText}`)}>
        Summarize term
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='w-full flex flex-row'>
      <div className={`h-screen overflow-y-auto w-2/4 ${show ? 'hidden' : ''}`}>
        {
          show ? (
            <div>No PDF selected</div>
          ) : (
            pdf ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <div style={{ height: '750px', position: 'relative' }}>
                  <Viewer
                    fileUrl={pdf}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                  {menuVisible && (
                    <Dropdown overlay={menu} visible={menuVisible} trigger={['click']}>
                      <span
                        style={{
                          position: 'absolute',
                          top: menuPosition.y,
                          left: menuPosition.x,
                          visibility: 'hidden',
                          zIndex: 1
                        }}
                      />
                    </Dropdown>
                  )}
                </div>
              </Worker>
            ) : (
              <div>There has been an error</div>
            )
          )
        }
      </div>
      <div className={`bg-gray-400 h-screen w-1 hover:cursor-col-resize ${show ? 'hidden' : ''}`} onMouseDown={onMouseDown}></div>
      {show?<div className='w-full justify-end'>
        
      <ChatBot 
          MessageList={LMessageList}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          messages={messages}
          isLoading={isLoading}
        />
      </div>
     : <div className='w-2/4 justify-end'>
        
     <ChatBot 
         MessageList={LMessageList}
         handleInputChange={handleInputChange}
         handleSubmit={handleSubmit}
         input={input}
         messages={messages}
         isLoading={isLoading}
       />
     </div>
    }
    </div>
  );
}

export default PageOfSession;
