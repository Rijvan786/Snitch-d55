import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import { CreateProduct } from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Home from "../features/products/components/Home";
import ViewProduct from "../features/products/components/ViewProduct";
import Payment from "../features/products/pages/Payment";

import Addtocart from "../features/products/components/Addtocart";
import Protected from "../features/auth/components/Protected";
import SellerViewProduct from "../features/products/components/SellerViewProduct";
import EditProduct from "../features/products/components/EditProduct";

const role ="seller"
export const router=createBrowserRouter([{
    path:"/",
    element:<Home/>
},
{
    path:"/ViewProduct/:ProductId",
    element:<ViewProduct/>
},
{
    path:"/cart/:cartId",
    element:<Addtocart/>},
{
    path:"/payment",
    element:<Payment/>
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
            path:"/seller/EditProduct/:ProductId",
            element:<Protected role="seller"> 
                <EditProduct/>
            </Protected>
        }
    ]
}


])