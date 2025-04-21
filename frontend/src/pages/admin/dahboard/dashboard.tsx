import React from "react";
import { FaUsers, FaHamburger, FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../../../services/user";
import CustomCard from "../../../components/ui/CustomButton";

const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => await listUsers(),
  });

  const stats = data?.data || {};
  console.log(stats.result, "dashboard user data");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Superadmin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <CustomCard
          icon={<FaShoppingBag size={24} />}
          label="Total Orders"
          value={stats.totalOrders || 0}
          bgColor="bg-blue-100"
        />
        <CustomCard
          icon={<FaUsers size={24} />}
          label="Total Customers"
          value={stats.result || 1}
          bgColor="bg-green-100"
        />
        <CustomCard
          icon={<FaMoneyBillWave size={24} />}
          label="Revenue"
          value={`₹ ${stats.revenue?.toLocaleString() || 0}`}
          bgColor="bg-yellow-100"
        />
        <CustomCard
          icon={<FaHamburger size={24} />}
          label="Top Dish"
          value={stats.topDish || "N/A"}
          bgColor="bg-pink-100"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading data...</p>
        ) : isError ? (
          <p className="text-center text-lg text-red-500">Failed to fetch data.</p>
        ) : (
          <ul>
            {stats.recentOrders?.map((order) => (
              <li key={order._id} className="border-b py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.dishName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">₹ {order.amount}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
