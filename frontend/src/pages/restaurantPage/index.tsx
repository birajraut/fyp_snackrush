import { useState } from "react";
import Model from "../../components/ui/Model";
import RestaurantCreateForm from "../../components/ui/forms/RestaurantCreateForm"
import { LuHotel } from "react-icons/lu";
import { listRestaurant } from "../../services/restaurant"
import { useQuery } from "@tanstack/react-query";
import { IRestaurantResponse } from "../../types/restaurant"
import RestaurantCard from "../../components/ui/restaurant/RestaurantCard"
import CustomButton from "../../components/ui/CustomButton";
import { CiCirclePlus } from "react-icons/ci";




const RestaurantPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: restaurantList } = useQuery({
    queryKey: ['restaurant-list', isModalOpen],
    queryFn: async () => listRestaurant()
  })



  return (
    
    <div className="container mx-auto p-6">
      <Model openModel={isModalOpen} setModelOpen={setIsModalOpen} title="Create a restaurant" body={<RestaurantCreateForm setIsModalOpen={setIsModalOpen} />} icon={<LuHotel />} showIcon />

      <div className="flex items-center justify-between bg-purple-100 p-4 rounded-md mb-10">
      <h1 className="text-2xl font-bold text-purple-700">Restaurants</h1>

    <div className="flex justify-end ">
      <CustomButton type="button" onClick={() => setIsModalOpen(true)} label='Create Restaurant' icon={<CiCirclePlus />} showIcon />
    </div>
      </div>


      <div className="grid grid-cols-4 gap-5">
        {
          restaurantList?.data?.result?.map((restaurant: IRestaurantResponse) => {
            return (
              <RestaurantCard id={restaurant._id} title={restaurant.name} description={restaurant.description} logo={restaurant.image || ''} />
            )
          })
        }
      </div>
    </div>
  );
};

export default RestaurantPage;
