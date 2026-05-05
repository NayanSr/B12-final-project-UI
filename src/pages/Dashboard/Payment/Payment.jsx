import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router";

const Payment = () => {

    const {parcelId}= useParams();

    const axiosSecure= useAxiosSecure();

    const {isLoading,data:parcel}=useQuery({
        queryKey:['parcels', parcelId],
        queryFn: async()=>{
const res= await axiosSecure.get(`/parcels/${parcelId}`);
return res.data;
        }
    })

if(isLoading){
    return <div className="w-full flex items-center justify-center"><p className="text-xl text-rose-600 font-semibold">Loading. Please Wait...</p></div>
}

    return (
        <div>
            <h2>Please Pay for : {parcel.parcelName}</h2>
            <button className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;