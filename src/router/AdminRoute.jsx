import Forbidden from "../components/Logo/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute=({children})=>{
const { loading}= useAuth();
const {role, roleLoading}= useRole();
console.log(role)


if(loading || roleLoading){
     return <div className="w-full flex items-center justify-center"><p className="text-xl text-rose-600 font-semibold">Loading. Please Wait...</p></div>
}

if(role?.role!=='admin'){
    return(
        <Forbidden/>
    )
}

    return children
};

export default AdminRoute;

