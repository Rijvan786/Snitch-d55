import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import { CreateProduct } from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

export const router=createBrowserRouter([{
    path:"/",
    element:<><h1>Heloo </h1></>
},
{path:"/register",
    element:<Register/>
},
{ 
    path:"/login",
    element:<Login/>
},
{    path:"/seller",
    children:[
        {
            path:"/seller/create-product",
            element:<Protected role="seller">
                <CreateProduct/>
            </Protected>
        },
        {
            path:"/seller/Dashboard",
            element:<Protected>
                <Dashboard/>
            </Protected>
            
        }
    ]
},


])