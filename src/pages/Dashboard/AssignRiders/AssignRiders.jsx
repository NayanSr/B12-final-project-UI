import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const riderModalRef = useRef();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch:parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });
  // console.log("parcel", parcels);

  // TODO: Invalidate query after assigning a rider
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`,
      );

      return res.data;
    },
  });

  // console.log("Riders:", riders);

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider=rider=>{
    const assignedRiderInfo={
      riderId: rider._id,
      riderEmail:rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id
    };
    axiosSecure.patch(`/parcels/${selectedParcel._id}`, assignedRiderInfo)
    .then(res=>{
      if(res.data.modifiedCount){
        riderModalRef.current.close();
        parcelRefetch();
        // TODO use Swal
        alert("Rider Has Been Assigned.")
      }
    })
    console.log(assignedRiderInfo);
  }

  return (
    <div className="text-center">
      <h3>Assign a Rider</h3>
      <p>parcels for delivery: {parcels.length}</p>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created AT</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-secondery"
                  >
                    Available Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders: {riders.length}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action(Assign)</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider,i)=><tr>
                  <th>{i+1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td><button className="btn btn-success" onClick={()=>handleAssignRider(rider)}>Assign</button></td>
                </tr>)}
                
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
