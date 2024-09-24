import { useEffect, useRef } from "react"
import Button from "../components/Button.jsx"
import {Input} from "../components/Input"
import {useDispatch, useSelector} from 'react-redux'
import { signinThunk } from "../features/authSlice.js"
import { useNavigate } from "react-router-dom"

export default function SignIn() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const currentUser = useSelector(state=>state.auth)
  console.log(currentUser);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  async function handelSignIn(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const signinData = {email,password}
    dispatch(signinThunk(signinData))
  }

  useEffect(()=>{
    if(currentUser.isActive) {
      naviagte('/')
    }
  },[currentUser,dispatch])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white  rounded-lg shadow-lg border-t-4">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handelSignIn}>
          <div className="space-y-2">
            <Input id="email" type="email" placeholder="Enter your email" label="Email" ref={emailRef} labelStyle="" required />
          </div>
          <div className="space-y-2">
            <Input id="password" type="password" placeholder="Enter your password" label="Password" ref={passwordRef} required />
          </div>
          <Button className="w-full text-white bg-button-black" type="submit">
            {currentUser?.status=='idel' || currentUser?.status=='failed'?'Sign In':'Laoding...'}
          </Button>
          {currentUser?.error ?<p className="text-red-600">{currentUser?.error}</p>:''}
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Button href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}