import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit3 } from "react-icons/fi";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id, parcelName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)

        axiosSecure.delete(`/parcels/${id}`)
        .then(res=>{
          console.log(res.data)
         if(res.data.deletedCount){
          refetch();
           Swal.fire({
          title: "Deleted!",
          text: `Your parcel ${parcelName} has been deleted.`,
          icon: "success",
        });
         }
        })

        
    });
  };

  return (
    <div>
      <h2>All My Parcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>Blue</td>
                <td>
                  <button className="btn  hover:bg-success">
                    <FiEdit3 className="w-4 h-4 stroke-3" />
                  </button>
                  <button className="btn  hover:bg-success mx-2">
                    <HiMagnifyingGlassPlus className="w-4 h-4 stroke-1" />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id, parcel.parcelName)}
                    className="btn  hover:bg-success"
                  >
                    <FaRegTrashCan className="w-4 h-4 stroke-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
