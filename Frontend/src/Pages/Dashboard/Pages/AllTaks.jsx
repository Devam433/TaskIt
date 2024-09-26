import React, { useState } from 'react'
import Task from '../../../components/DashboardComponent/Task.jsx'

const AllTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design new landing page", status: "In Progress", priority: "High", finishBy: "2023-10-05" },
    { id: 2, title: "Update user documentation", status: "Not Started", priority: "Medium", finishBy: "2023-10-10" },
    { id: 3, title: "Refactor authentication module", status: "Completed", priority: "High", finishBy: "2023-09-30" },
    { id: 4, title: "Implement dark mode", status: "In Progress", priority: "Low", finishBy: "2023-10-15" },
  ])

  const handleStatusChange = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId
        ? { ...task, status: task.status === 'Completed' ? 'In Progress' : 'Completed' }
        : task
    ))
  }

  const handleEdit = (taskId) => {
    // Implement edit functionality here
    console.log(`Editing task with id: ${taskId}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-4 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
          <div className="col-span-5 sm:col-span-4">Task</div>
          <div className="col-span-3 sm:col-span-2">Status</div>
          <div className="col-span-2 sm:col-span-2">Priority</div>
          <div className="col-span-2 sm:col-span-3">Due Date</div>
          <div className="col-span-2 sm:col-span-1"></div>
        </div>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default AllTasks