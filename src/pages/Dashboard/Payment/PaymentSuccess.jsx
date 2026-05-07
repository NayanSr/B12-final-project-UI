import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo]= useState({})
  const sessionId = searchParams.get("session_id");
  const axiosSecure= useAxiosSecure();
  // console.log(sessionId)
  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then(res=>{
      console.log(res.data);
      setPaymentInfo({
        transactionId:res.data.transactionId,
        trackingId:res.data.trackingId
      })
      })
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-5xl text-secondary">Payment Successfull</h2>
      <p>Your Transection ID is: {paymentInfo.transactionId}</p>
      <p>Your Tracking ID is: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
