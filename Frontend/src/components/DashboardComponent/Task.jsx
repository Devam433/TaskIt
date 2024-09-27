import React, { useState } from 'react'
import { Edit2, Calendar, Flag, Trash } from 'lucide-react'
import EditTaskModal from './EditTaskModal'

const Task = ({ task, hideCheckBox, handleEditTaskSubmit,moveCheckedTaskToBottom}) => {

  const [isChecked,setIsChecked] = useState(false);

  const [isModalOpen,setIsModalOpen] = useState(false);
  console.log(task);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started':
        return 'bg-slate-200 text-slate-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-slate-200 text-slate-700'
    }
  }
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'text-green-500'
      case 'Medium':
        return 'text-yellow-500'
      case 'High':
        return 'text-red-500'
      default:
        return 'text-slate-500'
    }
  }

  //implement this feature
  function onStatusChange(id){
    console.log('on status change');
    setIsChecked(prev=>!prev);
    moveCheckedTaskToBottom(id)
  }

  function toggleModal() {
    setIsModalOpen(prev=>!prev)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      {
      isModalOpen && <EditTaskModal  toggleModal={toggleModal} task={task} handleEditTaskSubmit={handleEditTaskSubmit}/>
      }<div className="grid grid-cols-12 gap-2 p-4 items-center border-b border-gray-200">
        <div className="col-span-5 sm:col-span-4 flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onStatusChange(task.id)}
            className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer ${hideCheckBox && `hidden`}`}
          />
          <h3 className={`ml-3 text-sm sm:text-base font-medium truncate ${isChecked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </h3>
        </div>
        <div className="col-span-3 sm:col-span-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-2 flex items-center text-sm text-gray-500">
          <Flag className={`w-4 h-4 mr-1 ${getPriorityColor(task.priority)}`} />
          <span className="hidden sm:inline">{task.priority}</span>
        </div>
        <div className="col-span-2 sm:col-span-3 flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{new Date(task.finishBy).toLocaleDateString()}</span>
        </div>
        <div className="col-span-2 sm:col-span-1 flex justify-end">
          <button
            onClick={() => toggleModal()}  /**Pass the task data */
            className="p-2 text-gray-400 hover:text-blue-500 focus:outline-none transition-colors duration-300"
            aria-label="Edit task"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => {}}
            className="p-2 text-gray-400 hover:text-rose-400 focus:outline-none transition-colors duration-300"
            aria-label="Edit task"
          >
            <Trash className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task