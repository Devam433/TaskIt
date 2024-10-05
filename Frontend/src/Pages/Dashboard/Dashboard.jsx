import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/Button';

import Header from '../../components/DashboardComponent/Header';
import Aside from '../../components/DashboardComponent/Aside';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../../components/DashboardComponent/Breadcrumbs';
import AddTaskModal from '../../components/DashboardComponent/AddTaskModal';
import { useDispatch } from 'react-redux';
import { addTask, fetchTasks } from '../../features/tasksSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState('')
  const [taskName, setTaskName] = useState('');

  const [finishBy, setFinishBy] = useState('')
  const dispatch = useDispatch();
  // Toggle modal open/close state
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle form submission (you can expand this based on your logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({title:taskName,finishBy:finishBy,priority:priority,isCompleted:false}))
    .then(()=>{
      console.log('tak created now calling fetchTasks')
      dispatch(fetchTasks());
    })

    toast.success('New task created!',{
      position: 'top-right',
      autoClose: 2000,
    })
    setTaskName(''); // Reset the input field after submission
    setPriority('');
    setFinishBy('');
    toggleModal(); // Close the modal
  };



  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
            <ToastContainer/>
      {/* Header */}
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      {/* Sidebar and Main Content */}
      <div className="flex">
        <AddTaskModal isOpen={isOpen} handleSubmit={handleSubmit} taskName={taskName} setTaskName={setTaskName} toggleModal={toggleModal} priority={priority} finishBy={finishBy} setPriority={setPriority} setFinishBy={setFinishBy} title='Add New Task'/>
        {/* Sidebar */}
        <Aside sidebarOpen={sidebarOpen} />
        {/* Main Content */}
        <div className='flex-1 p-6'>
          <Breadcrumbs/>
          <Outlet />
        </div>
      </div>
      {/* Add New Task Button */}
      <Button
        className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-xl p-4 shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out overflow-hidden group"
        aria-label="Add new task"
        onClick={toggleModal}
      >
        <div className="flex items-center">
          <Plus className="h-6 w-6 transition-all duration-300 ease-in-out group-hover:rotate-90" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-xs group-hover:ml-2">
            Add Task
          </span>
        </div>
      </Button>
    </div>
  );
}