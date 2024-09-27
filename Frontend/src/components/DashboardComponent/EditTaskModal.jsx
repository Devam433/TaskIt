import React, { useState } from 'react'
import { X } from "lucide-react"


export default function EditTaskModal({toggleModal,task,handleEditTaskSubmit}) {

  const [isSaving,setIsSaving] = useState(false);
  console.log('this is EditTaskModal',task)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  const [finishBy, setFinishBy] = useState('')


  async function onSubmit(event,task) {
    setIsSaving(true)
    event.preventDefault()
    const actualTask = {...task} //shallow copy of task
    const updatedValues = {title,priority,finishBy};


    Object.keys(actualTask).forEach((key) => { //update the actualTask object with new values
      if (updatedValues.hasOwnProperty(key)) {
        actualTask[key] = updatedValues[key];
      }
    });

    const response = await handleEditTaskSubmit(task._id,actualTask);
    if(response.success) {
      setIsSaving(false);
      toggleModal();
    }
    else {
      setIsSaving(false);
      toggleModal();
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900">Edit Task</h2>
        <form onSubmit={(e)=>onSubmit(e,task)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSaving && `bg-gray-100`}`}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${isSaving && `bg-gray-100`}`}
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
              required
              id="finishBy"
              type="date"
              value={finishBy}
              onChange={(e) => setFinishBy(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSaving && `bg-gray-100`}`}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200" disabled={isSaving}>
            { isSaving ? `Saving Changes...` : `Save Changes`}
          </button>
        </form>
      </div>
    </div>
  )
}
