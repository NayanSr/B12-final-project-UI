// import { useForm } from "react-hook-form"

const Registration = () => {
// const {register}= useForm()

  return (
    <div>
        <form >
           <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
         
        </fieldset>
        </form>
    </div>
  )
}

export default Registration