import useAuth from "../../hooks/useAuth";

const GoogleLoginBtn = () => {
const {googleSignin}= useAuth();

const handleGoogleSignin=()=>{
  googleSignin()
  .then(result=>{console.log(result.user)})
  .catch(error=>console.log(error))
}


  return (
    <button className="btn bg-emerald-200 text-black border-none w-full" onClick={handleGoogleSignin}>
      <span className='flex items-center gap-2'>
        <p className='text-xl font-bold text-green-700'>G</p>
        <p>Login with Google</p>
        </span>
      
    </button>
  );
};

export default GoogleLoginBtn;
