import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router";

const Payment = () => {
  const { parcelId } = useParams();

  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment=async ()=>{
    const paymentInfo={
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName
    }
    const res= await axiosSecure.post('/create-checkout-session', paymentInfo);
    console.log(res.data);
    window.location.href= res.data.url

  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <p className="text-xl text-rose-600 font-semibold">
          Loading. Please Wait...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Please Pay ${parcel.cost} for : {parcel.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
