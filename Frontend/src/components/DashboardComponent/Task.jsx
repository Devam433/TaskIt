import React, { useState } from 'react'
import { Edit2, Calendar, Flag, Trash , TriangleIcon, ChevronDown} from 'lucide-react'
import EditTaskModal from './EditTaskModal'

const Task = ({ task,hide=false, hideCheckBox, handleEditTaskSubmit,handleDeleteTask,hideStatusDropDown,hideFinishBy}) => {
  const [isChecked,setIsChecked] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
  async function onStatusChange(newStatus, task){
    let status;
    
    if(newStatus === 'Start Task') {status = 'In Progress'}
    if(newStatus === 'Stop Task') {status = 'Not Started'}
    if(newStatus === 'Mark as Done') {status = 'Completed'}
  
    const actualTask = {...task} //shallow copy of task
    const updatedValues = {isCompleted:!task.isCompleted,status};

    Object.keys(actualTask).forEach((key) => { //update the actualTask object with new values
      if (updatedValues.hasOwnProperty(key)) {
        actualTask[key] = updatedValues[key];
      }
    });
    handleEditTaskSubmit(task._id,actualTask);
  }

  function toggleModal() {
    setIsModalOpen(prev=>!prev)
  }
  
  const handleStatusChange = (newStatus,task) => {
    setIsOpen(false);
    onStatusChange(newStatus,task);
  };

  function handleOnCheck() {
    setIsChecked(prev=>!prev);
  }

  function handleOnDelete(task) {
    handleDeleteTask(task._id);
  }
  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out ${isChecked && `bg-gray-200`}`}>
      {
      isModalOpen && <EditTaskModal  toggleModal={toggleModal} task={task} handleEditTaskSubmit={handleEditTaskSubmit}/>
      }<div className="grid grid-cols-12 gap-2 p-4 items-center border-b border-gray-200">
        <div className="col-span-5 sm:col-span-4 flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleOnCheck(task)}
            className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer ${hideCheckBox && `hidden`}`}
          />
          <h3 className={`ml-3 text-sm sm:text-base font-medium truncate ${task.status =='Completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </h3>
        </div>
        <div className={`col-span-3 sm:col-span-2 relative`} >
        <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2 py-1 flex items-center space-x-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${getStatusColor(task.status)}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={`text-xs font-medium `}>{task.status}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${hide && `hidden`}`} />
      </button>

      {isOpen && !hide && (
        <div className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40 ${hideStatusDropDown && `hidden`}`}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {['Start Task', 'Stop Task', 'Mark as Done'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status,task)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
        </div>
        <div className={` flex items-center text-sm text-gray-500 ${hideFinishBy ? `` : `col-span-2 sm:col-span-2`}`}>
          <Flag className={`w-4 h-4 mr-1 ${getPriorityColor(task.priority)}`} />
          <span className="hidden sm:inline">{task.priority}</span>
        </div>
        <div className={`col-span-2 sm:col-span-3 flex items-center text-sm text-gray-500 ${hideFinishBy && `hidden`}`}>
          <Calendar className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{new Date(task.finishBy).toLocaleDateString()}</span>
        </div>
        <div className={`col-span-2 sm:col-span-1 flex justify-end ${hide && `hidden`}`}>
          <button
            onClick={() => toggleModal()}  /**Pass the task data */
            className={`p-2 text-gray-400 hover:text-blue-500 focus:outline-none transition-colors duration-300"
            aria-label="Edit task" ${task.status==='Completed' || isChecked ? 'hidden' :''}`}
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => {handleOnDelete(task)}}
            className={`p-2 text-gray-400 hover:text-rose-400 focus:outline-none transition-colors duration-300 ${isChecked ? `block` : `hidden`}`}
            aria-label="Edit task"
          >
            <Trash className={`w-5 h-5 `}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task