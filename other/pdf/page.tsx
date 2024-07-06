// // app/split-screen/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
// import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// const SplitScreen = () => {
//   const [leftPanelSize, setLeftPanelSize] = useState<number>(50);
//   const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

//   useEffect(() => {
//     if (leftPanelSize < 20) {
//       setIsCollapsed(true);
//     } else {
//       setIsCollapsed(false);
//     }
//   }, [leftPanelSize]);

//   const handleToggle = () => {
//     setIsCollapsed(!isCollapsed);
//     setLeftPanelSize(isCollapsed ? 50 : 0);
//   };

//   return (
//     <PanelGroup direction="horizontal" className="flex h-screen">
//       <Panel
//         defaultSize={50}
//         size={isCollapsed ? 0 : leftPanelSize}
//         onResize={(size) => setLeftPanelSize(size)}
//         className={`flex-1 bg-blue-500 p-4 flex items-center justify-center transition-all duration-100 ${
//           isCollapsed ? 'hidden' : 'block'
//         }`}
//       >
//         <p className="text-white text-2xl">Left Side</p>
//       </Panel>
//       <PanelResizeHandle className="w-2 bg-gray-400 cursor-col-resize flex items-center justify-center">
//         <button onClick={handleToggle} className="text-white">
//           {isCollapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
//         </button>
//       </PanelResizeHandle>
//       <Panel className="flex-1 bg-green-500 p-4 flex items-center justify-center">
//         <p className="text-white text-2xl">Right Side</p>
//       </Panel>
//     </PanelGroup>
//   );
// };

// export default SplitScreen;
