import { FaShieldAlt, FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 bg-error/10 rounded-full flex items-center justify-center">
            <FaShieldAlt size={80} className="text-error" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-error mb-2">403</h1>
        
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-3">Access Forbidden</h2>
        
        {/* Message */}
        <p className="text-base-content/70 text-lg mb-8">
          You don't have permission to access this admin page. 
          Please contact your administrator if you believe this is a mistake.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline flex items-center gap-2"
          >
            <FaArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaHome size={20} />
            Back to Home
          </button>
        </div>

        {/* Optional: Contact Support */}
        <p className="text-sm text-base-content/50 mt-10">
          Need help? Contact <span className="text-primary">support@yourapp.com</span>
        </p>
      </div>
    </div>
  );
};

export default Forbidden;