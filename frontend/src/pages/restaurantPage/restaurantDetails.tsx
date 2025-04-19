// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { resturantDetailsFn } from "../../services/restaurant";
// import { IRestaurantResponse } from "../../types/restaurant";
// import placeholder from "../../assets/restaurantPlaceholder.png";
// import ProductCard from "../../components/ui/restaurant/product/ProductCard";
// import { listProduct } from "../../services/productService";
// import { GoLocation } from "react-icons/go";
// import { CiPhone } from "react-icons/ci";


// const RestaurantDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: restaurant, isLoading, isError } = useQuery({
//     queryKey: ["restaurant-details", id],
//     queryFn: async () => resturantDetailsFn(id as string),
//   });
//   const { data: productList, isLoading: isLoadingProduct, error: errorProduct } = useQuery({
//     queryKey: ['products', id],
//     queryFn: async () => listProduct(id as string),
//   });
//   const restaurantData: IRestaurantResponse = restaurant?.data?.result
//   if (isLoading) {
//     return 'Loading restaurant'
//   }
//   if (isError) {
//     return 'Error fetching restaurant'
//   }


//   console.log(restaurant,'restaurant data')
//   return (
//     <div>
//       <div className="relative w-full h-[450px] bg-white">
//         <img src={restaurantData?.banner || placeholder} alt={restaurantData?.name} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
//           <div className="container mx-auto">
//             <div className="w-16 h-16 rounded-md overflow-hidden">
//               <img src={restaurantData.image || ''} alt="logo" className="w-full h-full object-cover" />
//             </div>
//             <h1 className="text-3xl font-bold text-white">{restaurantData?.name}</h1>
//             <p className="text-gray-300">{restaurantData?.description}</p>

//             <div>
//               <ul className="text-white space-y-3 mt-5">
//                 <li className="flex items-center gap-5">
//                   <div>
//                     <GoLocation />
//                   </div>
//                   <div>{restaurantData.address||"N/A"}</div>
//                 </li>
//                 <li className="flex items-center gap-5">
//                   <div>
//                     <CiPhone />
//                   </div>
//                   <div>{restaurantData?.phone||'N/A'}</div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//         </div>
//       </div>


//       <div className="container mx-auto">
//         <div className="p-6 flex flex-col">
//           <h2 className="text-xl font-semibold mb-4">Most Reviewed Food</h2>
//           <div
//             style={{ scrollBehavior: "smooth" }}
//           >
//             {
//               isLoadingProduct && 'Loading Products'
//             }

//             {
//               errorProduct && 'Error loading Products'
//             }
//             <div className="grid grid-cols-3 gap-5">
//               {
//                 productList?.data?.result?.map((product, index) => {
//                   return (
//                     <div key={index}>
//                       <ProductCard
// restaurant={product}
//                         id={product._id}
//                         title={product.name}
//                         description={product.description}
//                         price={product?.price}
//                         forUser
//                       // className=' border border-b-transparent rounded-b-none'
//                       />

//                     </div>

//                   )
//                 })
//               }
//             </div>
//           </div>

//         </div>
//       </div>


//     </div>
//   );
// };

// export default RestaurantDetail;


import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { resturantDetailsFn } from "../../services/restaurant";
import { IRestaurantResponse } from "../../types/restaurant";
import placeholder from "../../assets/restaurantPlaceholder.png";
import { listProduct } from "../../services/productService";
import { GoLocation } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { addToCart, removeFromCart, resetCart } from "../../redux/reducers/cartSlice";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Fetch restaurant details
  const { data: restaurant, isLoading, isError } = useQuery({
    queryKey: ["restaurant-details", id],
    queryFn: async () => resturantDetailsFn(id as string),
  });

  // Fetch product list
  const { data: productList, isLoading: isLoadingProduct, error: errorProduct } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => listProduct(id as string),
  });

  const restaurantData: IRestaurantResponse = restaurant?.data?.result;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading restaurant details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">Error fetching restaurant details.</p>
      </div>
    );
  }

  const getProductQuantity = (productId: string) => {
    const productInCart = cart.find((item) => item._id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  const handleAdd = (product) => {
    if (cart.length > 0) {
      // Check if all items in the cart are from the same restaurant
      const sameRestaurant = cart[0]?.restaurant?._id === product?.restaurant?._id;
  
      if (!sameRestaurant) {
        // Alert the user if the cart contains items from a different restaurant
        const confirmClearCart = window.confirm(
          "Your cart contains items from another restaurant. Do you want to clear the cart and add this item?"
        );
        if (!confirmClearCart) {
          return; // Do nothing if the user cancels
        }
        // Clear the cart if the user confirms
        dispatch(resetCart());
      }
    }
  
    // Add the product to the cart
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Banner */}
      <div className="relative w-full h-[450px] bg-white">
        <img
          src={restaurantData?.image || placeholder}
          alt={restaurantData?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white">{restaurantData?.name}</h1>
                <p className="text-gray-300 mt-2">{restaurantData?.description}</p>
              </div>
            </div>
            <ul className="text-white space-y-3 mt-6">
              <li className="flex items-center gap-3">
                <GoLocation className="text-xl" />
                <span>{restaurantData?.address || "N/A"}</span>
              </li>
              <li className="flex items-center gap-3">
                <CiPhone className="text-xl" />
                <span>{restaurantData?.phone || "N/A"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        {isLoadingProduct ? (
          <p className="text-center text-lg text-gray-500">Loading products...</p>
        ) : errorProduct ? (
          <p className="text-center text-lg text-red-500">Error loading products.</p>
        ) : (
          <div className="space-y-6">
            {productList?.data?.result?.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-6 bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={product.image || placeholder}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  <p className="text-sm text-gray-800 font-semibold mt-2">
                    Price: ${product.price}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={getProductQuantity(product._id) === 0}
                    className={`px-4 py-2 rounded-lg ${
                      getProductQuantity(product._id) > 0
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800">
                    {getProductQuantity(product._id)}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;