import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRootReducer } from '../../types/redux';
import { listOrder } from '../../services/sale';

const OrderPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((root: IRootReducer) => root.auth);
  const { restaurant } = useSelector((root: IRootReducer) => root.auth);
  const { pathname } = useLocation();

  console.log('Current user:', user); // Debug log for user
  console.log('Current pathname:', pathname); // Debug log for pathname

  const { data: orderFromServer, isLoading: isLoadingOrder, isError: isErrorOrder } = useQuery({
    queryKey: ['orders', user?._id],
    queryFn: async () => {
      if (!user?._id && pathname !== '/restaurant/orders') {
        console.log('No user ID available'); // Debug log
        return null;
      }
      const isNormalUser = pathname !== '/restaurant/orders';
      const params = isNormalUser 
        ? { user_id: user?._id, restaurant_id: undefined }
        : { user_id: undefined, restaurant_id: restaurant?.id };
      
      console.log('Request params:', params); // Debug log for params
      const res = await listOrder(params);
      console.log('API response:', res); // Debug log for API response
      
      if (res?.data?.result?.message) {
        return null;
      } else {
        return res.data.result;
      }
    },
    enabled: !!user?._id || pathname === '/restaurant/orders', // Only run the query if user is logged in or it's a restaurant order page
  });

  // Function to format date
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (!user && pathname !== '/restaurant/orders') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Please log in to view your orders</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Orders</h1>

      {isLoadingOrder ? (
        <p className="text-center text-lg text-gray-500">Loading orders...</p>
      ) : orderFromServer?.length === 0 || !orderFromServer ? (
        <p className="text-center text-lg text-gray-500">You don't have any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orderFromServer.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-800">Order #{order._id}</h2>
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    order.payment_status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>

              <p className="text-gray-600 mb-2">Order Date: {formatDate(order.sale_date)}</p>

              <div className="space-y-4">
                {order.products?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <img
                      src={item?.product?.restaurant?.image || 'https://via.placeholder.com/100'}
                      alt={item?.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item?.product?.name}</h3>
                      <p className="text-sm text-gray-600">{item?.product?.description}</p>
                      <p className="text-sm text-gray-600">
                        Restaurant: {item?.product?.restaurant?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Address: {item?.product?.restaurant?.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item?.quantity} | Price: ${item?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-gray-800 font-semibold">
                Total: ${order.total_cost}
              </div>

              {pathname !== '/restaurant/orders' && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/track/${order._id}`, { state: { order } })}
                    className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
                  >
                    Track
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
