import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import Privateroute from "./Privateroute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/dashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";


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
      path:'send-parcel',
      element: <Privateroute><SendParcel/></Privateroute>,
      loader:()=>fetch('/serviceCenters.json').then(res=>res.json())
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
  },
  {
    path:'dashboard',
    element: <Privateroute><DashboardLayout/></Privateroute>,
    children:[
      {
        path: 'my-parcels',
        Component: MyParcels
      }
    ]
  }
]);