import React from 'react'
import Button from './Button'

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Button className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">TaskIt</span>
            </Button>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Button href="/about">About</Button>
              <Button href="/features">Features</Button>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Button href="/signin">
                <Button variant="ghost" className="mr-2">
                  Sign In
                </Button>
              </Button>
              <Button href="/signup">
                <Button>Sign Up</Button>
              </Button>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header