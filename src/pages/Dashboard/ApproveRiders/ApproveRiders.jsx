import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleViewDetails=rider=>{
   console.log(rider);
  // TODO >> Use a modal to show details
  }

  const updateRiderStatus=(rider,status)=>{
     const updateInfo= {status:status, email:rider.email};
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
    .then(res=>{
       if(res.data.modifiedCount){
        alert(`You request has been ${status}`);
        refetch()
       }
    })
  }

const handleApproval=rider=>{
   updateRiderStatus(rider,'approved')
}

const handleRejection=rider=>{
    updateRiderStatus(rider,'rejected')
}



  return (
    <div>
      <h2 className="text-4xl">Riders Pending Approval {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider,index)=><tr key={index}>
              <th>{index+1}</th>
              <td>{rider?.name}</td>
              <td>{rider?.email}</td>
              <td>{rider?.district}</td>
              <td><p className={`${rider.status==="approved"? 'text-blue-700' :'text-orange-400'}`}>{rider?.status}</p></td>
              <td>
                <button onClick={()=>handleViewDetails(rider)}>
                    <FaRegEye  className="btn btn-sm mr-4" />
                </button>
                <button onClick={()=>handleApproval(rider)}>
                    <FaUserCheck className="btn btn-sm" />
                </button>
                <button onClick={()=>handleRejection(rider)}>
                    <IoPersonRemove  className="btn btn-sm mx-4" />
                </button>
                <button>
                    <FaRegTrashCan  className="btn btn-sm" />
                </button>
              </td>
             
            </tr>)}
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
