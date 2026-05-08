
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './App.route.jsx'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hook/useAuth.js'
import { useSelector } from 'react-redux'

function App() {


const user=useSelector(state=>state.auth.User)
console.log(user);
const {handleGetMe}=useAuth()


  useEffect(()=>{
    handleGetMe()
  },[])
  return (
   <RouterProvider router={router}/>
  )

}

export default App
