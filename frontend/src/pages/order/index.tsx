import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootReducer } from '../../types/redux';
import { listOrder } from '../../services/sale';

const OrderPage = () => {
    const navigate = useNavigate();
    const {  user } = useSelector((root: IRootReducer) => root.auth)


    const { data: order, isLoading:isLoadingOrder, isError:isErrorOrder } = useQuery({
        queryKey: ["orders"+user?._id],
        queryFn: async () => listOrder(),
      });
    

console.log(order,'order fetched')


    // Sample order data
    const orders = [
        {
            orderId: '12345',
            date: '2023-03-20',
            status: 'Delivered',
            total: 220,
            items: [
                { name: 'Momo', quantity: 3, price: 100 },
                { name: 'Chowmein', quantity: 1, price: 120 },
            ],
        },
        {
            orderId: '12346',
            date: '2023-03-18',
            status: 'Shipped',
            total: 160,
            items: [
                { name: 'Pizza', quantity: 2, price: 80 },
                { name: 'Salad', quantity: 1, price: 40 },
            ],
        },
    ];

    // Function to format date
    const formatDate = (date: string) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Orders</h1>

            {orders.length === 0 ? (
                <p className="text-center text-lg text-gray-500">You don't have any orders yet.</p>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order.orderId} className="bg-white shadow-lg rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Order #{order.orderId}</h2>
                                <span className={`px-4 py-2 rounded-full text-white ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2">Order Date: {formatDate(order.date)}</p>
                            <p className="text-gray-600 mb-4">Total: ${order.total}</p>

                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-gray-800 font-medium">{item.name}</span>
                                        <span className="text-gray-600">x{item.quantity} - ${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <button
                                    onClick={() => navigate(`/order/${order.orderId}`)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                                >
                                    View Order Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
