import React from 'react'
import LableComponent from './LableComponent'
import { Button } from 'antd'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-16 text-center">Login</h2>
              <form>
              <LableComponent title='Email' placeholder='Email here' type='email' ></LableComponent>
             <LableComponent title='Password' placeholder='*******' type='password' ></LableComponent>
      <div className="mt-11 flex justify-center">
      <button className=" text-lg w-[90%] bg-teal-100 border-2 border-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded-full focus:outline-teal focus:shadow-outline shadow-lg">
            Login
          </button>
          </div>
              </form>
    </div>
  )
}

export default Login