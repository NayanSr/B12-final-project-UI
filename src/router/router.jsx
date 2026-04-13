import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import Privateroute from "./Privateroute";
import Rider from "../pages/Rider/Rider";


export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
      index:true,
      Component: Home
    },
    {
      path:'rider',
      element: <Privateroute><Rider/></Privateroute>
    },
    {
      path:'coverage',
      Component: Coverage,
      loader: ()=>fetch('/serviceCenters.json').then(res=>res.json())
    },
   ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path:'login',
        Component: Login
      },
      {
        path:'register',
        Component: Registration
      }
    ]
  }
]);