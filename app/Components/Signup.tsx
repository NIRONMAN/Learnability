import React from 'react'
import LableComponent from './LableComponent'
import { Button } from 'antd'


type Props = {
}

const Signup = (props: Props) => {
  return (
    <div><h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
    <form onSubmit={(e)=>{
      e.preventDefault()
    }}>
      <LableComponent title='Name' placeholder='Name here' type='text' ></LableComponent>
      <LableComponent title='Email' placeholder='Email here' type='email' ></LableComponent>
      <LableComponent title='Password' placeholder='*******' type='password' ></LableComponent>
      <button>Click me</button>
    </form></div>
  )
}

export default Signup


// className={`bg-white w-1/2 h-[120%] rounded-lg relative bottom-10 left-10 transform transition-transform duration-500 ${
//     moveCard ? 'translate-x-60' : ''
//   }`}