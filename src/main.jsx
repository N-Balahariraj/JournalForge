import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Contact from './Components/Contact.jsx'
import Journals from './Components/Journals.jsx'
import Publish from './Components/Publish.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/SignUp.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"About",
        element:<About/>
      },
      {
        path:"Contact",
        element:<Contact/>
      },
      {
        path:"Journals",
        element:<Journals/>
      },
      {
        path:"Publish",
        element:<Publish/>
      },
      {
        path:"Profile",
        element:<Signup/>
      },
      {
        path:"Login",
        element:<Login/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

