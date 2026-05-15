import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import {useState} from 'react';

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText]= useState('');
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // console.log(users);

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

  const handleRoleToUser = (user) => {
    const userInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, userInfo).then((res) => {
      if (res.data.modifiedCount) {
        //TODO use toast to confirm
        alert("Role changed to User");
        refetch();
      }
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl">Manage Users</h2>
      <p>Total Users: {users.length}</p>
      <p>Searching for: {searchText}</p>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search a user" />
      </label>









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
                    <button
                      onClick={() => handleRoleToUser(user)}
                      className="btn btn-ghost bg-red-500 "
                    >
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
