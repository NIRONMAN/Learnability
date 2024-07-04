import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../GlobalRedux/store'
import { changeAuth } from '../GlobalRedux/Features/auth/authSlice'

type Props = {}

const SignupLoginText = (props: Props) => {
    const dispatch=useDispatch()
    const isLogin=useSelector((state:RootState)=>state.auth.value)
    const signupObj={
        title:"Hello,\n Welcome",
        quote:"Live as if you were to die tomorrow.",
        text:"Already have an account? ",
        buttonText:"Signup"

    }
    const loginObj={
        title:"Hello,\n Welcome Back",
        quote:"The beautiful thing about learning is that no one can take it away from you.",
        text:"Don't have an account? ",
        buttonText:"Login"



    } 
  return (
    <div className={ `flex flex-col justify-between h-full p-4 text-white ${isLogin?" mr-0":" mr-0"}`}>
        <h2 className=' text-3xl font-semibold'>{isLogin?loginObj.title:signupObj.title}</h2>
        <p>{isLogin?loginObj.quote:signupObj.quote}</p>
        <p className=''>{isLogin?loginObj.text:signupObj.text}<button
        onClick={()=>{
            dispatch(changeAuth())
          }}
        >{isLogin?loginObj.buttonText:signupObj.buttonText}</button></p>
    </div>
  )
}

export default SignupLoginText