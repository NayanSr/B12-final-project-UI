import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "rider_assgined"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/riders/?riderEmail=${user?.email}&deliveryStatus=riderAssigned`,
      );
      return res.data;
    },
  });

  console.log("Ps", parcels);

  const handleStatusUpdate = (parcel, status) => {
    const statusUpdate = { deliveryStatus: status, riderId: parcel.riderId };
    const message= `Parcel Status in now ${status.split('_').join(' ')}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusUpdate)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showCancelButton: false,
            timer: 2000,
          });
        }
      });
  };

  // TODO
  const handleRejectDelivery = (parcel) => {
    alert(
      `change delivery status and remove edditional field ${parcel.riderName}`,
    );
  };

  return (
    <div>
      <h2>Parcels Pickup Pending: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>


                <td>
                  {(parcel.deliveryStatus === "rider_assigned") && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel, "rider_arriving")
                        }
                        
                        className="btn btn-success mr-4"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectDelivery(parcel)}
                        className="btn btn-warning"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(parcel.deliveryStatus !== "rider_assigned" || parcel.deliveryStatus === "parcel_picked_up" || parcel.deliveryStatus === "parcel_delivered") && (
                    <>
                      <p className="text-md text-green-800 font-semibold">
                        Accepted
                      </p>
                    </>
                  )}
                  {/* //? Here we con also use turnerry openratr */}
                </td>

                <td>




                  <span className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-info mr-4"
                      disabled={
                        parcel.deliveryStatus === "rider_assigned" ||
                        parcel.deliveryStatus === "parcel_picked_up" ||
                        parcel.deliveryStatus === "parcel_delivered"
                      }
                    >
                      {parcel.deliveryStatus === "parcel_picked_up"
                        ? "Picked Up"
                        : "Mark as Picked Up"}
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-info mr-4"
                      disabled={ parcel.deliveryStatus === "rider_assigned" || parcel.deliveryStatus === "rider_arriving" || parcel.deliveryStatus === "parcel_delivered"}
                    >
                      {parcel.deliveryStatus === "parcel_delivered"
                        ? "Parcel Delivered"
                        : "Mark as Parcel Delivered"}
                    </button>
                  </span>





                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
