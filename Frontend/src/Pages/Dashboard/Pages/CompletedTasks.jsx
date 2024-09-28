import React, { useEffect } from 'react'
import Task from '../../../components/DashboardComponent/Task.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch,useSelector } from 'react-redux'
import { getCompletedTasks } from '../../../features/tasksSlice.js'
import axios from 'axios'

function CompletedTasks() {
  const completedTasks = useSelector(state => state.tasks.completedTasks);
  const dispatch = useDispatch();

  async function handleDeleteTask(taskId) {
    try {
      const response = await axios.delete(`/api/todos/${taskId}`,{
        headers:{
          'token' : localStorage.getItem('token')
        }
      })
      if(response) {
        toast.success('Task Deleted!',{
          position: 'top-right',
          autoClose: 2000,
        })
        callFetchTasks()
      }
    } catch (error) {
      toast.error('Failed to Delete Task!',{
        position: 'top-right',
        autoClose: 2000,
      })
      console.log(error);
    }
  }

  useEffect(()=>{
    console.log('useeffect getCompletedTasks')
    dispatch(getCompletedTasks())
  },[dispatch])

  if (!completedTasks || completedTasks.length === 0) return <h1 className="text-3xl font-bold text-gray-800 mb-6">No task found</h1>;

return (
<div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
  <ToastContainer/>
  <h1 className="text-3xl font-bold text-gray-800 mb-6">My Completed Tasks</h1>
  <div className="bg-white rounded-lg shadow pb-[300px] overflow-hidden">
    <div className="grid grid-cols-12 gap-2 p-4 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
      <div className="col-span-5 sm:col-span-4">Task</div>
      <div className="col-span-3 sm:col-span-2">Status</div>
      <div className="col-span-3 sm:col-span-2">Priority</div>
    </div>
    {completedTasks.map(task => (
      <Task
        key={task._id}
        task={task}
        hideStatusDropDown={true}
        hideFinishBy={true}
        handleDeleteTask={handleDeleteTask}
        />
    ))}
  </div>
</div>
  )
}

export default CompletedTasks