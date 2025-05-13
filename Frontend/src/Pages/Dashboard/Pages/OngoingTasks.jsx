import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasksByStatus } from '../../../features/tasksSlice';
import { ToastContainer } from 'react-toastify';
import Task from '../../../components/DashboardComponent/Task';

function OngoingTasks() {
const OngoingTasks = useSelector(state=>state.tasks.tasksByStatus)

const dispatch = useDispatch();

function handleDeleteTask(){ //

}

useEffect(()=>{
    dispatch(getTasksByStatus({status:'In Progress'}))
  },[])

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
  <ToastContainer/>
  <h1 className="text-3xl font-bold text-gray-800 mb-6">My Ongoing Tasks</h1>
  <div className="bg-white rounded-lg shadow pb-[300px] overflow-hidden">
    <div className="grid grid-cols-12 gap-2 p-4 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
      <div className="col-span-5 sm:col-span-4">Task</div>
      <div className="col-span-3 sm:col-span-2">Status</div>
      <div className="col-span-3 sm:col-span-2">Priority</div>
    </div>
    {OngoingTasks.map(task => (
      <Task
        key={task._id}
        task={task}
        hideStatusDropDown={true}
        hideFinishBy={true}
        handleDeleteTask={handleDeleteTask}//
        />
    ))}
  </div>
</div>
  )
}

export default OngoingTasks