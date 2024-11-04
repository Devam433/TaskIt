import React from 'react'
import { NavLink } from 'react-router-dom'

function ErrorBoundary() {
  return (
    <div className='w-[700px] mx-auto text-center'>
      <h1>Unexpected Application Error!</h1>
      <p>404 Page Not Found</p>
      <p><NavLink to={'/'} className='text-blue-500'>Go back to Home</NavLink></p>
    </div>
  )
}

export default ErrorBoundary