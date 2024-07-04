import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../GlobalRedux/store'
import { changeAuth } from '../GlobalRedux/Features/auth/authSlice'

type Props = {}

const SignupLoginText = (props: Props) => {
    const dispatch=useDispatch()
    const isLogin=useSelector((state:RootState)=>state.auth.value)
    const signupObj={
        title:"Hello,", 
        subtitle:"Welcome",
        quote:"Live as if you were to die tomorrow",
        text:"Don't have an account? ",
        buttonText:"Signup"

    }
    const loginObj={
        title:"Hello,", 
        subtitle:"Welcome Back",
        quote:"The beautiful thing about learning is that no one can take it away from you.",
        text:"Already have an account? ",
        buttonText:"Login"



    } 
  return (
    <div className={ `flex flex-col justify-between h-full p-4 text-black ${isLogin?" mr-8":" ml-15"}`}>
        <h2 className=' text-4xl font-semibold'>{isLogin?loginObj.title:signupObj.title} <br />
        {isLogin ? loginObj.subtitle : signupObj.subtitle}</h2>
        <p className="text-2xl  italic ">&quot;{isLogin ? loginObj.quote : signupObj.quote}&quot;</p>
        <p className="text-xl font-semibold">
                {isLogin ? loginObj.text : signupObj.text}{' '}
                <button
                    onClick={() => {
                        dispatch(changeAuth());
                    }}
                    className=" underline"      
        >
          {isLogin?loginObj.buttonText:signupObj.buttonText}</button></p>
    </div>
  )
}

export default SignupLoginText