import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory=()=>{
    const {user}= useAuth();
    const axiosSecure= useAxiosSecure();
    const {data:payments=[]}=useQuery({
        queryKey:['payments', user.email],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data
        }
    })
    console.log(payments)


    return(
        <div>
            <h2>Total Payments:{payments.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Amount</th>
        <th>Transaction Id</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((payment, index)=><tr>
        <th>{index+1}</th>
        <td>{payment.parcelName}</td>
        <td>${payment.amount}</td>
        <td>{payment.transactionId}</td>
      </tr>)
      }
      
     
    </tbody>
  </table>
</div>
        </div>
    )
}

export default PaymentHistory;