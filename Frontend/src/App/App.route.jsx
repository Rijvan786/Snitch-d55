import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import { CreateProduct } from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Home from "../features/products/components/Home";
import ViewProduct from "../features/products/components/ViewProduct";
import Payment from "../features/products/pages/Payment";
import Protected from "../features/auth/components/Protected";
import SellerViewProduct from "../features/products/components/SellerViewProduct";  
import Cart from "../features/cart/pages/Cart";
import AppLayout from "./AppLayout";
import UserProfile from "../features/auth/pages/UserProfile";
import SellerProfile from "../features/auth/pages/SellerProfile";
const role ="seller"
export const router=createBrowserRouter([{
    path:"/",
    element:<Home/>
},


{path:"/register",
    element:<Register/>
},
{ 
    path:"/login",
    element:<Login/>
},
  {
    path:"/Profile",
    element:<UserProfile/>
},
{
    element:<AppLayout/>,
    children:[
        {
    path:"/ViewProduct/:ProductId",
    element:<ViewProduct/>
},

{
    path:"/cart",
    element:<Cart/>},
  
{
    path:"/payment",
    element:<Payment/>
},


    ]
    
    
},
{    path:"/seller",
    children:[
        {
            path:"/seller/create-product",
            element:
                  <Protected role="seller">
                    <CreateProduct/>    
                  </Protected>
 
        },
        {
            path:"/seller/Dashboard",
            element:<Protected role="seller">
                <Dashboard/> 
            </Protected>
            
            
        },
        {
            path:"/seller/products/:ProductId",
            element:<Protected role="seller"> 
                <SellerViewProduct/>
            </Protected>
        },
        {
            path:"/seller/profile",
            element:<Protected role="seller"><SellerProfile/></Protected>
        },
   
    ]
}


])