import React, { useEffect, useRef, useState } from 'react'
import {Input} from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { Loader2 } from 'lucide-react'

function SignUp() {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [success,setSuccess] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSignUp(event) {
    setSuccess(false)
    setLoading(true)
    event.preventDefault()
    try {
      const response = await axios.post('/api/users/signup',
        {
          name:nameRef.current.value,
          email:emailRef.current.value,
          password:passwordRef.current.value
        }
      )
      console.log('sign up frontend message',response)
      setSuccess(true)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error)
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-3">
      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-5 py-4 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your account has been created. <NavLink to={'/signin'} className="font-semibold text-blue-600">Sign In Now</NavLink></span>
        </div>
      )}
      {
      !success && (
      <div className="w-full max-w-md p-8 space-y-6 bg-white  rounded-lg shadow-lg border-t-4">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <Input id="name" type="text" placeholder="Enter your name" label="Full name" ref={nameRef} labelStyle="" required />
          </div>
          <div className="space-y-2">
            <Input id="email" type="email" placeholder="Enter your email" label="Email" ref={emailRef} labelStyle="" required />
          </div>
          <div className="space-y-2">
            <Input id="password" type="password" placeholder="Enter your password" label="Password" ref={passwordRef} required />
          </div>
          <Button className="w-full text-white bg-button-black" type="submit" >
          {loading?'Loading':'Sign Up'}
          </Button>
          {error ?<p className="text-red-600">{error.response.data.message}</p>:''}
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have an account?{" "}
            <Button href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Button>
          </p>
        </div>
      </div>)
      }
      {loading && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full mx-4">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Signing Up...</p>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Please wait while we verify your credentials. This may take a few moments.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp