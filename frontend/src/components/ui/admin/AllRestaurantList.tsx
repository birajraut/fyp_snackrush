import CustomButton from "../CustomButton"
import { LuEye } from "react-icons/lu";
import { RestaurantViewForm } from "../forms/restaurantViewForm";
import { useNavigate } from "react-router-dom";
import moment from "moment"

interface IProps {
    restaurantList: any
}

const AllRestaurantList = ({ restaurantList }: IProps) => {

    const navigate = useNavigate()
    const handleCLick = (id: string) => {
        navigate(`/admin/restaurant/${id}`)
    }
    return (
        <>
            <div className="bg-white  rounded-md overflow-hidden">
                <table className="table-auto w-full">
                    <thead className="text-left border-b bg-pink-500 text-white">
                        <tr >
                            <th className="p-5">Name</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            restaurantList?.map((item, index) => {
                                return (
                                    <tr key={index} className="border-b">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-md overflow-hidden">
                                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-700">{item.name}</div>
                                                    <div className="text-xs text-gray-500 ">{item.location}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">{item?.creator?.fullName}</td>
                                        <td className="py-5">
                                            <button type="button" className="bg-green-100 text-xs text-green py-2 px-6 rounded-full capitalize">{item.status?.toLowerCase()}</button>
                                        </td>
                                        <td className="py-5">{ item.createdAt && moment(item.createdAt).startOf('hour').fromNow()}</td>
                                        <td className="py-5">

                                            <CustomButton icon={<LuEye />} showIcon type="button" onClick={() => handleCLick(item._id)} label={'View'} />
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AllRestaurantList