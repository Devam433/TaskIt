import React, { useRef, useState } from 'react'
import {Input} from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'

function SignUp() {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSignUp(event) {
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
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error)
      setLoading(false);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white  rounded-lg shadow-lg border-t-4">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
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
      </div>
    </div>
  )
}

export default SignUp