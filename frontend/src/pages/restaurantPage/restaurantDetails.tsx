import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { resturantDetailsFn } from "../../services/restaurant";
import { IRestaurantResponse } from "../../types/restaurant";
import placeholder from "../../assets/restaurantPlaceholder.png";
import ProductCard from "../../components/ui/restaurant/product/ProductCard";
import { listProduct } from "../../services/productService";
import { GoLocation } from "react-icons/go";
import { CiPhone } from "react-icons/ci";


const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: restaurant, isLoading, isError } = useQuery({
    queryKey: ["restaurant-details", id],
    queryFn: async () => resturantDetailsFn(id as string),
  });
  const { data: productList, isLoading: isLoadingProduct, error: errorProduct } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => listProduct(id as string),
  });
  const restaurantData: IRestaurantResponse = restaurant?.data?.result
  if (isLoading) {
    return 'Loading restaurant'
  }
  if (isError) {
    return 'Error fetching restaurant'
  }


  console.log(restaurant,'restaurant data')
  return (
    <div>
      <div className="relative w-full h-[450px] bg-white">
        <img src={restaurantData?.banner || placeholder} alt={restaurantData?.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="container mx-auto">
            <div className="w-16 h-16 rounded-md overflow-hidden">
              <img src={restaurantData.image || ''} alt="logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold text-white">{restaurantData?.name}</h1>
            <p className="text-gray-300">{restaurantData?.description}</p>

            <div>
              <ul className="text-white space-y-3 mt-5">
                <li className="flex items-center gap-5">
                  <div>
                    <GoLocation />
                  </div>
                  <div>{restaurantData.address||"N/A"}</div>
                </li>
                <li className="flex items-center gap-5">
                  <div>
                    <CiPhone />
                  </div>
                  <div>{restaurantData?.phone||'N/A'}</div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>


      <div className="container mx-auto">
        <div className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Most Reviewed Food</h2>
          <div
            style={{ scrollBehavior: "smooth" }}
          >
            {
              isLoadingProduct && 'Loading Products'
            }

            {
              errorProduct && 'Error loading Products'
            }
            <div className="grid grid-cols-3 gap-5">
              {
                productList?.data?.result?.map((product, index) => {
                  return (
                    <div key={index}>
                      <ProductCard
restaurant={product}
                        id={product._id}
                        title={product.name}
                        description={product.description}
                        price={product?.price}
                        forUser
                      // className=' border border-b-transparent rounded-b-none'
                      />










                    </div>

                  )
                })
              }
            </div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default RestaurantDetail;

