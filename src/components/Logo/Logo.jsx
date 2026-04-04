import logo from "../../assets/logo.png"
const Logo = () => {
  return (
    <div className="flex items-end" >
        <img src={logo} className="w-1/4" alt="Logo Image" />
        <h3 className="text-2xl font-semibold -ml-2">ZapShift</h3>
    </div>
  )
}

export default Logo