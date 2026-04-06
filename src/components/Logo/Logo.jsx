import { Link } from "react-router"
import logo from "../../assets/logo.png"
const Logo = () => {
  return (
   <Link to='/'>
    <div className="flex items-end" >
        <img src={logo} className="w-1/4" alt="Logo Image" />
        <h3 className="text-2xl font-semibold -ml-2">ZapShift</h3>
    </div></Link>
  )
}

export default Logo