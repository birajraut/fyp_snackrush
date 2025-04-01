import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';





const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.cart); // get cart items from state

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleIncreaseQuantity = (id: string) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecreaseQuantity = (id: string) => {
        dispatch(decreaseQuantity(id));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

const handleCheckout=()=>{
    navigate("/checkout")
}



    return (
        <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
                ) : (
                    cart?.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                <div>
                                    <h3 className="font-semibold text-xl">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleDecreaseQuantity(item._id)}
                                        className="w-8 h-8 bg-gray-300 text-white rounded-full flex justify-center items-center hover:bg-gray-400"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        readOnly
                                        className="w-12 text-center bg-gray-100 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        onClick={() => handleIncreaseQuantity(item._id)}
                                        className="w-8 h-8 bg-gray-300 text-white rounded-full flex justify-center items-center hover:bg-gray-400"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</div>
                <button

                onClick={()=>handleCheckout()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={cart.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
