import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-44">
        <Logo />
      </div>
      <div className="flex items-center px-4">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <img src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
