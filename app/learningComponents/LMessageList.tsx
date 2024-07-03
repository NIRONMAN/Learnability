import React from 'react';
import MarkdownContent from '../Components/Markdown';

interface Props {
    arr: any[];
}

function LMessageList({ arr }: Props) {
    console.log(arr);

    return (
        <div id="chatElement" className="text-white flex flex-col">
            {arr?.map((element: any, index: number) => (
                <div
                    key={element.id}
                    className={`${
                        element.role === 'user' ? 'self-end bg-[#2f2f2f] ml-auto text-left' : 'bg-[#212121]'
                    } p-2 mb-2 rounded-lg `}
                >
                    <MarkdownContent rawText={element.content}></MarkdownContent>
                </div>
            ))}
        </div>
    );
}

export default LMessageList;