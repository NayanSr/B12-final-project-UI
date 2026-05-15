import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  console.log(users);

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        //TODO use toast to confirm
        alert("role changed to Admin");
        refetch();
      }
    });
  };

  const handleRoleToUser=user=>{
    const userInfo= {role:'user'};
    axiosSecure.patch(`/users/${user._id}/role`,userInfo)
    .then(res=>{
        if(res.data.modifiedCount){
              //TODO use toast to confirm
            alert('Role changed to User');
            refetch()
        }
    })
  }

  return (
    <div className="text-center">
      <h2 className="text-4xl">Manage Users</h2>
      <p>Total Users: {users.length}</p>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <th>
                  {user.role === "admin" ? (
                    <button onClick={()=>handleRoleToUser(user)} className="btn btn-ghost bg-red-500 ">
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-teal-500"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">action</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
