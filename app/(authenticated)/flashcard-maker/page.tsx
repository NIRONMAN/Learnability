"use client"
import React, { useEffect, useState } from 'react'

type Props = {}

const page = (props: Props) => {
  const [state,setState]=useState(1);
 

  return (
    <div  className='flex bg-slate-400 flex-col' style={{height:'calc(100vh - 56px)'}} >
        <div className='bg-green-200 flex-grow w-full overflow-y-auto'>
        {}
        
        </div>
        <div className=' bg-red-200  w-full'>last</div>
    </div>
  )
}

export default page