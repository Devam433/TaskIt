import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Task from '../../../components/DashboardComponent/Task.jsx'
import { fetchTasks } from '../../../features/tasksSlice.js'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTasks = () => {
  const allTasks = useSelector(state => state.tasks.allTasks);
  const dispatch = useDispatch();

  //this function is used for both checkbox and edit
  async function handleEditTaskSubmit(id,updatedTask) {
    try {
      const response = await axios.put(`/api/todos/${id}`,updatedTask,{
        headers:{
          'token':localStorage.getItem('token')
        }
      })
      if(response) {
        toast.success('Update success!', {
          position: 'top-right',
          autoClose: 2000,
        });
        callFetchTasks();
        console.log(response)
        return {success:true};
      }
    } catch (error) {
      toast.error('Update failed!', {
        position: 'top-right',
        autoClose:2000,
      });
      console.log(error);
      return {success:false}
    }
  }
  
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

  function callFetchTasks() {
    dispatch(fetchTasks());
  }

  useEffect(() => {
    callFetchTasks();
  }, [dispatch]);

  if (!allTasks || allTasks.length === 0) return <h1 className="text-3xl font-bold text-gray-800 mb-6">No task found</h1>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <ToastContainer/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>
      <div className="bg-white rounded-lg shadow pb-[300px] overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-4 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
          <div className="col-span-5 sm:col-span-4">Task</div>
          <div className="col-span-3 sm:col-span-2">Status</div>
          <div className="col-span-2 sm:col-span-2">Priority</div>
          <div className="col-span-2 sm:col-span-3">Due Date</div>
          <div className="col-span-2 sm:col-span-1"></div>
        </div>
        {allTasks.map(task => (
          <Task
            key={task._id}
            task={task}
            handleEditTaskSubmit={handleEditTaskSubmit}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default AllTasks;
