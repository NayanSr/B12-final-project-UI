import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import {Link} from 'react-router'

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {registerUser}= useAuth();


  const handleRegistration = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
    .then(result=>{
      console.log(result)
    })
    .catch(error=>{console.log(error)})
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 text-lg">Email could not be empty.</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/ })}
            className="input"
            placeholder="Password"
            
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700 text-lg">Password could not be empty.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700 text-lg">
              Password mut be atlest 6 character
            </p>
          )}
          {errors.password?.type==='pattern' && <p className="text-lg text-red-500">Password must contain one uppercase one lowercase one number and one special character.</p> }
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
      <p className="mt-2 ">Already have an account? Go to <Link to='/login' className='underline text-blue-600 text-lg'>LogIn</Link> </p>
    </div>
  );
};

export default Registration;
