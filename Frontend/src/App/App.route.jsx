import { createBrowserRouter } from "react-router";
import Dashboard from "../features/auth/pages/Dashboard";
import Regsiter from "../features/auth/pages/Regsiter";
import Login from "../features/auth/pages/Login";

export const router=createBrowserRouter([{
    path:"/",
    element:<Dashboard/>
},
{path:"/register",
    element:<Regsiter/>
},
{ 
    path:"/login",
    element:<Login/>
}

])