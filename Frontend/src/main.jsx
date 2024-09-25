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
import Dashboard from './Pages/Dashboard'
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
          element:<ProtectedRoute><Dashboard/></ProtectedRoute>
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