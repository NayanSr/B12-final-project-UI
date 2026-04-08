import { useForm } from "react-hook-form";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log(data);
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
            {...register("password", { required: true, minLength: 6,pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/ })}
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
    </div>
  );
};

export default Registration;
