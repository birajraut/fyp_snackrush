import React from "react";
import Input from "../../../components/ui/Input";
import { CiSearch } from "react-icons/ci";
import CustomButton from "../../../components/ui/CustomButton";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../../../services/user"; // Assume this is the service to fetch users

const UserListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-list"],
    queryFn: async () => await listUsers(),
  });
console.log(data, "user list");
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User List</h1>
        <div className="flex items-center gap-4">
          <Input
            name="search"
            onChange={() => {}}
            type="search"
            placeholder="Search User..."
            icon={<CiSearch />}
            className="w-80"
          />
          <CustomButton
            type="button"
            label={"Search"}
            icon={<CiSearch />}
            showIcon
            className="bg-blue-600 text-white hover:bg-blue-700"
          />
        </div>
      </div>

      {/* User List Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading users...</p>
        ) : isError ? (
          <p className="text-center text-lg text-red-500">Failed to load users.</p>
        ) : (
          <ul>
            {data?.data?.result?.map((user) => (
              <li key={user._id} className="border-b py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserListPage;

