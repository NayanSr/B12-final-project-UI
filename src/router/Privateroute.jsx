import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth"

const Privateroute = ({children}) => {
const {user, loading}= useAuth();

const location= useLocation();
console.log(location)

if(loading){
    return <div className="w-full flex items-center justify-center"><p className="text-xl text-rose-600 font-semibold">Loading. Please Wait...</p></div>
}

if(!user){
    return <Navigate to='/login' state={location.pathname}/>
}

  return children
}

export default Privateroute;