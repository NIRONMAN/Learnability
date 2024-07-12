// "use client"
// import React, { useEffect, useState } from 'react'

// type Props = {}

// const page = (props: Props) => {
//   const [state,setState]=useState(1)
//   const ytdl = require('ytdl-core');
// const fs = require('fs');
// const path = require('path');

// const url = 'https://youtube.com/shorts/mmK0vV_Efs0?si=yyrZHipZ0bAqCvoY'; // Replace with your YouTube URL
// const outputFilePath = path.resolve('audio_test.webm');

// async function testYtdl() {
//   try {
//     // const info = await ytdl.getInfo(url);
//     // console.log('Video info fetched successfully:', info.title);

//     const stream = ytdl(url, { filter: 'audioonly' });
//     stream.pipe(fs.createWriteStream(outputFilePath));

//     stream.on('end', () => {
//       console.log('Audio downloaded successfully:', outputFilePath);
//     });

//     stream.on('error', (err) => {
//       console.error('Stream error:', err);
//     });
//   } catch (error) {
//     console.error('Error fetching video info:', error);
//   }
// }

// useEffect(()=>{
//     const clearinterval=setTimeout(()=>{
//       testYtdl()
//     },3000)
//     setState(state+1)
//     return ()=>clearInterval(clearinterval)

// },[state])

//   return (
//     <div  className='flex bg-slate-400 flex-col' style={{height:'calc(100vh - 56px)'}} >
//         <div className='bg-green-200 flex-grow w-full overflow-y-auto'>
//         {}
        
//         </div>
//         <div className=' bg-red-200  w-full'>last</div>
//     </div>
//   )
// }

// export default page