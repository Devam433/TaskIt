
import { useEffect, useRef } from "react"
import Button from "../components/Button.jsx"
import {Input} from "../components/Input"
import {useDispatch, useSelector} from 'react-redux'
import { signinThunk } from "../features/authSlice.js"
import { useNavigate } from "react-router-dom"
import { Loader2 } from 'lucide-react'

export default function SignIn() {
  const currentUser = useSelector(state=>state.auth)
  const emailRef = useRef()
  const passwordRef = useRef()
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

  const isLoading = currentUser?.status === 'loading'
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
      {isLoading && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full mx-4">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Signing In...</p>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Please wait while we verify your credentials. This may take a few moments.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}