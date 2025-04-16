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

  const { data: orderFromServer, isLoading: isLoadingOrder, isError: isErrorOrder } = useQuery({
    queryKey: ['orders', user?._id],
    queryFn: async () => {
      const res = await listOrder(restaurant?._id);
      if (res?.data?.result?.message) {
        return null;
      } else {
        return res.data.result;
      }
    },
  });

  // Function to format date
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Orders</h1>

      {orderFromServer?.length === 0 || !orderFromServer ? (
        <p className="text-center text-lg text-gray-500">You don't have any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orderFromServer.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-800">Order #{order._id}</h2>
                <span className={`px-4 py-2 rounded-full text-white ${order.payment_status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {order.payment_status}
                </span>
              </div>

              <p className="text-gray-600 mb-2">Order Date: {formatDate(order.sale_date)}</p>

              <div className="space-y-2">
                {order.products?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-800 font-medium">{item?.product_id?.name}</span>
                      <p className="text-gray-600 text-sm">x{item?.quantity} - ${item?.price * item?.quantity}</p>
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
