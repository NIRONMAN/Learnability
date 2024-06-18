import React from 'react';

interface Props {
    arr: any[];
}

function MessageList({ arr }: Props) {
    console.log(arr);

    return (
        <div className="text-white flex flex-col text-sm">
            {arr.map((element: any, index: number) => (
                <div
                    key={index}
                    className={`${
                        element.role === 'user' ? 'self-end bg-[#2f2f2f] ml-auto text-left' : 'bg-[#212121]'
                    } p-2 mb-2 rounded-lg`}
                >
                    {element.content}
                </div>
            ))}
        </div>
    );
}

export default MessageList;
