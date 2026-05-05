import { Link } from "react-router"

const PaymentCancelled = () => {
  return (
    <div>
        <h3>Payment is cancelled. Please try again</h3>
        <Link to="/dashboard/my-parcels">
        <button className="btn btn-secondary text-white">Try again</button>
        </Link>
    </div>
  )
}

export default PaymentCancelled