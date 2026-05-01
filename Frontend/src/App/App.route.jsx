import { createBrowserRouter } from "react-router";
import Dashboard from "../features/auth/pages/Dashboard";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";

export const router=createBrowserRouter([{
    path:"/",
    element:<Dashboard/>
},
{path:"/register",
    element:<Register/>
},
{ 
    path:"/login",
    element:<Login/>
}

])