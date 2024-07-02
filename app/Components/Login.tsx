import React from 'react'
import LableComponent from './LableComponent'
import { Button } from 'antd'

type Props = {}

const Login = (props: Props) => {
  return (
    <div>
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
              <form>
              <LableComponent title='Email' placeholder='Email here' type='email' ></LableComponent>
      <LableComponent title='Password' placeholder='*******' type='password' ></LableComponent>
                <Button color='blue' type='primary'>Login</Button>
              </form>
    </div>
  )
}

export default Login