import React from 'react'
import Button from '../Button'
import { CheckCircle, Circle, List } from 'lucide-react';

function Aside({sidebarOpen}) {
  return (
    <aside className={`bg-white w-64 min-h-screen shadow-lg transition-all duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 md:static absolute z-10`}>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Button className="w-full  text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200" childrenStyle='flex items-center w-full' href={'/dashboard/all-tasks'}>
              <List className="mr-2 h-5 w-5" />
              All Tasks
            </Button>
          </li>
          <li>
            <Button className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200" childrenStyle='flex items-center w-full' href={'/dashboard/ongoing-tasks'}>
              <Circle className="mr-2 h-5 w-5" />
              Ongoing Tasks
            </Button>
          </li>
          <li>
            <Button className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 " childrenStyle='flex items-center w-full' href={'/dashboard/completed-tasks'}> 
              <CheckCircle className="mr-2 h-5 w-5" />
              Completed Tasks
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Aside