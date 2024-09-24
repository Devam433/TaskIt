import React from 'react'

function Layout({children}) {
  return (
    <div className='w-full flex justify-between'>
      <div className='w-[95%] mx-auto'>
          {children}
      </div>
    </div>
  )
}

export default Layout