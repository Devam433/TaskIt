import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../features/tasksSlice';
import Task from '../../../components/DashboardComponent/Task';

function RootDashboard() {
const allTasks = useSelector(state=>state.tasks.allTasks)
console.log(allTasks);
const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchTasks())
  },[dispatch])

  return (
    <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Task Summary Cards */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Total Tasks</h2>
              <p className="text-4xl font-bold text-purple-600">{24}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Ongoing Tasks</h2>
              <p className="text-4xl font-bold text-yellow-500">10</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
              <p className="text-4xl font-bold text-green-500">14</p>
            </div>
          </div>
          {/* Recent Tasks Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Tasks</h2>
            {
              allTasks?.length==0 || !allTasks ? <h1 className="text-3xl font-bold text-gray-800 mb-6">No task found</h1>
            :
            <ul className="bg-white rounded-xl shadow-md divide-y divide-gray-200">
              {allTasks?.map((task) => (
                <Task task={task} hideCheckBox={true}/>
              ))}
            </ul>
            }
          </div>
        </main>
  )
}

export default RootDashboard