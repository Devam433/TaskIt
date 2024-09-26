import ReactDOM from 'react-dom/client'
import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import App from './App'
import './index.css'
import Home from './Pages/Home'
import { store } from './store/store'
import { ProtectedRoute } from './util/ProtectedRoute'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import AllTasks from './Pages/Dashboard/Pages/AllTaks.jsx'
import RootDashboard from './Pages/Dashboard/Pages/RootDashboard.jsx'
import OngoingTasks from './Pages/Dashboard/Pages/OngoingTasks.jsx'
import CompletedTasks from './Pages/Dashboard/Pages/CompletedTasks.jsx'
import DueTasks from './Pages/Dashboard/Pages/DueTasks.jsx'
  const router = createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      errorElement:null,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'/signin',
          element:<SignIn/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        },
        {
          path:'/dashboard',
          element:<ProtectedRoute><Dashboard/></ProtectedRoute>,
          children:[
            {
              path:'',
              element:<RootDashboard/>
            },
            {
              path:'all-tasks',
              element:<AllTasks/>
            },
            {
              path:'ongoing-tasks',
              element:<OngoingTasks/>
            },
            {
              path:'completed-tasks',
              element:<CompletedTasks/>
            },
            {
              path:'due-tasks',
              element:<DueTasks/>
            }
          ]
        }
      ]
    }
  ])

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>
  )