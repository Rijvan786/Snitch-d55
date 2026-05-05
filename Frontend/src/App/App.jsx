
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './App.route.jsx'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hook/useAuth.js'

function App() {


const {handleGetme}=useAuth()

  useEffect(function(){
    handleGetme()
  },[])
  return (
   <RouterProvider router={router}/>
  )

}

export default App
