import React from 'react'
import { X } from "lucide-react"

export default function AddTaskModal({ isOpen,taskName, handleSubmit,
  setTaskName,setPriority,setFinishBy,
  toggleModal,priority,finishBy}) {
  if (!isOpen) return null

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              placeholder="Enter task title"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="finishBy">Finish By</label>
            <input
              id="finishBy"
              type="date"
              value={finishBy}
              onChange={(e) => setFinishBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}