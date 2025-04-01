import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listRestaurant, resturantDetailsFn } from "../../services/restaurant";
import { IRestaurantResponse } from "../../types/restaurant";
import placeholder from "../../assets/restaurantPlaceholder.png";
import CustomButton from "../../components/ui/CustomButton";
import { CiCirclePlus } from "react-icons/ci";
import Model from "../../components/ui/Model";
import { useState } from "react";
import ProductForm from "../../components/ui/forms/ProductForm"
import { LuHotel } from "react-icons/lu";
import RestaurantCard from "../../components/ui/restaurant/RestaurantCard";
import ProductCard from "../../components/ui/restaurant/product/ProductCard";
import { listProduct } from "../../services/productService";
import { useSelector } from "react-redux";



const RestaurantDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
 const loginResponse = useSelector(state=>state.auth)
console.log(loginResponse,'login response')



  const { data: restaurant, isLoading, isError } = useQuery({
    queryKey: ["restaurant-details", id||loginResponse?.restaurant?.id],
    queryFn: async () => resturantDetailsFn(id as string||loginResponse?.restaurant?.id as string),
  });


  const { data: productList, isLoading:isLoadingProduct, error:errorProduct } = useQuery({
    queryKey: ['products'+(id||loginResponse?.restaurant?.id)],
    queryFn: async () => listProduct(id as string||loginResponse?.restaurant?.id as string  ),
  });

  // console.log(productList,'products list')


  const restaurantData:IRestaurantResponse = restaurant?.data?.result

  console.log('restaurant and its id', restaurant,id)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching restaurant details</p>;

  return (
    <div className="container mx-auto p-6">
      <Model openModel={isModalOpen} setModelOpen={setIsModalOpen} title="Add Item" body={<ProductForm setModelOpen={setIsModalOpen}        restaurantId={id||loginResponse?.restaurant?.id}
      />}
      
      icon={<LuHotel />} showIcon />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src={restaurantData?.image || placeholder} alt={restaurantData?.name} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-3xl font-bold mt-4">{restaurantData?.name}</h1>
        <p className="text-gray-600">{restaurantData?.description}</p>
      </div>

      <h2 className="text-2xl font-bold mt-6">{loginResponse?.restaurant?.name&&`${loginResponse?.restaurant?.name}`}</h2>
      <h2 className="text-2xl font-bold mt-6">Menu</h2>
      <div className="flex justify-end ">
      <CustomButton type="button" onClick={() => setIsModalOpen(true)} label='Add Items' icon={<CiCirclePlus />} showIcon />
    </div>
   
      <div className="p-6 flex flex-col">
  <h2 className="text-xl font-semibold mb-4">Most Reviewed Food</h2>
  <div
    id="restaurant-carousel"
    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-auto"
    style={{ scrollBehavior: "smooth" }}
  >
    {/* If data is loading, show a loader */}
    {isLoadingProduct ? (
      <div>Loading...</div>
    ) : errorProduct ? (
      <div>Error loading products</div>
    ) : (
      productList?.data?.result?.map((product, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden snap-center"
        >
          <ProductCard
          data={product}
            id={product._id} // Assuming _id is the product ID
            title={product.name}
            description={product.description}
            price={product?.price}
            logo={product.image || "/default-restaurant-image.png"}
          />
        </div>
      ))
    )}
  </div>

      </div>
    </div>
  );
};

export default RestaurantDetail;

