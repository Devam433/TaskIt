import React from 'react'

function Layout({children}) {
  return (
    <div className='w-full flex justify-between'>
      <div className='w-[1600px] mx-auto'>
          {children}
      </div>
    </div>
  )
}

export default Layout