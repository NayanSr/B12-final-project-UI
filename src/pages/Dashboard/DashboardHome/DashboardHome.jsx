import Loading from "../../../components/Loading";
import useRole from "../../../hooks/useRole"
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
    const {roleLoading,role}= useRole();
    console.log(role)
    if(roleLoading){
       return <Loading/>
    }
    if(role?.role==='admin'){
        return <AdminDashboard/>
    }
    else if(role?.role==='rider'){
        return <RiderDashboard/>
    }
    else{
        return <UserDashboard/>
    }
  
}

export default DashboardHome