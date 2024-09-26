import React from 'react'
import Button from '../Button'
import { Input } from '../Input'
import { Search, Menu, X, Bell, } from 'lucide-react';

function Header({setSidebarOpen,sidebarOpen}) {

  const Avatar = ({ src, alt, fallback }) => (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          {fallback}
        </div>
      )}
    </div>
  );

  return (
  
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button
                className="mr-2 md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">{sidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
              </Button>
              <img
                className="h-8 w-auto"
                src="https://via.placeholder.com/32"
                alt="TaskIt Logo"
              />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">TaskIt</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:ring-2 focus:ring-purple-500 transition-all duration-200 ease-in-out"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <Button className="text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar
                src="https://via.placeholder.com/32"
                alt="User Avatar"
                fallback="U"
              />
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header