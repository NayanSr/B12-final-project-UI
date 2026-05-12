import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GoogleLoginBtn = () => {
  const { googleSignin } = useAuth();
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure();

  const location = useLocation();
  console.log("social", location);

  const handleGoogleSignin = () => {
    googleSignin()
      .then((result) => {
        console.log(result.user);
       

        //Create user in db
        const userInfo={
          email: result.user.email,
          displayName:result.user.displayName,
          photoUrl: result.user.photoUrl
        }
        axiosSecure.post('/users', userInfo)
        .then(res=>{
          console.log('User Has created', res.data);
           navigate(location?.state || "/");
        })


      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="btn bg-emerald-200 text-black border-none w-full"
      onClick={handleGoogleSignin}
    >
      <span className="flex items-center gap-2">
        <p className="text-xl font-bold text-green-700">G</p>
        <p>Login with Google</p>
      </span>
    </button>
  );
};

export default GoogleLoginBtn;
