import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const location= useLocation();
  const navigate= useNavigate();
  const axiosSecure= useAxiosSecure();


  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        // console.log('Result User', result.user);

        //01. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 02. send the photo to store & get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        axios.post(image_API_URL, formData)
        .then(res => {
         const photoUrl= res.data.data.url;


         // Create user in database start
          const userInfo={
            displayName: data.name,
            email: data.email,
            photoUrl:photoUrl
          }

           axiosSecure.post("/users", userInfo)
          .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
              console.log('user created successfully')
            }
          })

            // Create user in database end


          //  update the profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoUrl,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User profile Updated");
              navigate(location?.state || '/')
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/*//! Name */}
          <label className="label">User Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 text-lg">Name could not be empty.</p>
          )}

          {/*//! Photo */}
          <label className="label">Upload Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 text-lg">Photo could not be empty.</p>
          )}

          {/*//! Email */}
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
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
            })}
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
          {errors.password?.type === "pattern" && (
            <p className="text-lg text-red-500">
              Password must contain one uppercase one lowercase one number and
              one special character.
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
      <p className="mt-2 ">
        Already have an account? Go to{" "}
        <Link state={location.state} to="/login" className="underline text-blue-600 text-lg">
          LogIn
        </Link>{" "}
      </p>
    </div>
  );
};

export default Registration;
