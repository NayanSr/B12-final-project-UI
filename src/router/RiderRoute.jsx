import Forbidden from "../components/Logo/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRoute = ({children}) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user|| roleLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <p className="text-xl text-rose-600 font-semibold">
          Loading. Please Wait...
        </p>
      </div>
    );
  }
  if(role?.role !== 'rider'){
    return <Forbidden/>
  }
  return children
};

export default RiderRoute;
