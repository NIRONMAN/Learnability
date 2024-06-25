

import React from 'react';

type Props = {
    arr: any;
    onHistoryClick: (sessionId: string) => void;
}


export default function HistoryCompo({ arr, onHistoryClick }: Props) {
  return (
      <div className="w-full">
          {arr.map((element: { title: string, sessionId: string }) => (
              <div
                  key={element.sessionId}
                  onClick={() => onHistoryClick(element.sessionId)}
                  className="cursor-pointer p-2 hover:bg-gray-700 rounded-md"
              >
                  {element.title}
              </div>
          ))}
      </div>
  );
}
