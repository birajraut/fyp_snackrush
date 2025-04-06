import React from "react"
import Input from "../../../components/ui/Input"
import { CiSearch } from "react-icons/ci";
import CustomButton from "../../../components/ui/CustomButton";

import NavTab from "../../../components/ui/Navtab"

import AllRestaurantList from "../../../components/ui/admin/AllRestaurantList"
import { useQuery } from "@tanstack/react-query";

import { restaurantListAdmin } from "../../../services/admin"
import { useLocation } from "react-router-dom";



const AdminRestaurantPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);



    const status = queryParams.get('status'); // if URL is ?name=John




    const { data } = useQuery({
        queryKey: ['admin-restaurant-list', status],
        queryFn: async () => await restaurantListAdmin(status && status || '' as string)
    })

    console.log('ad', data)


    const tablist = [
        {
            title: {
                id: '',
                name: 'All Restaurants'

            },
            content: <AllRestaurantList restaurantList={data?.data?.result} />
        },
        {
            title: {
                id: 'PENDING',
                name: 'Requested'

            },
            content: <AllRestaurantList restaurantList={data?.data?.result} />
        }
        ,
        {
            title:
            {
                id: 'REJECTED',
                name: 'Rejected'

            }
            ,
            content: <AllRestaurantList restaurantList={data?.data?.result} />
        }
    ]

    return (

        <>
            <div className="flex items-center gap-10">
                <div className="w-full">
                    <Input name="search" onChange={() => { }} type="search" placeholder="Search Restaurant..." icon={<CiSearch />} />
                </div>
                <div className="w-40">
                    <CustomButton type="button" label={'Search'} icon={<CiSearch />} showIcon />
                </div>
            </div>

            <div className="mt-10">
                <NavTab tabList={tablist} />
            </div>




        </>

    )
}

export default AdminRestaurantPage