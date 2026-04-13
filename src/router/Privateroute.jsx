/* import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth"

const Privateroute = ({children}) => {
const {user, loading}= useAuth();

if(loading){
    return <div className="w-full flex items-center justify-center"><p className="text-xl text-rose-600 font-semibold">Loading. Please Wait...</p></div>
}

if(!user){
    return <Navigate to='/login'/>
}

  return children
}

export default Privateroute */