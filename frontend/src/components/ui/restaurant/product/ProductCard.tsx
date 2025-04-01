import { useNavigate } from "react-router-dom"
import placeholder from "../../../../assets/restaurantPlaceholder.png"
import { useDispatch } from "react-redux"
import { addToCartSlice } from "../../../../redux/reducers/cartSlice"

interface IProps {
    id:string
    title:string,
    description:string,
    logo?:string
    price?:string|number,
    data?:{
        id:string
        title:string,
        description:string,
        logo?:string
        price?:string|number,
    }
}
const ProductCard = ({title, description, logo, price,id,data}:IProps)=>{
    // const navigate = useNavigate()
    const dispatch = useDispatch()

//     const handleRedirect = ()=>{
// navigate(`/Product/details/${id}`)
//     }

const addToCart=(item)=>{
dispatch(addToCartSlice(item))
}


    return (
        <div className=" rounded-md shadow overflow-hidden group  border hover:border-purple-500 cursor-pointer" >
            <div className="w-full h-36 overflow-hidden">
                <img src={logo || placeholder} alt="logo_image" className="w-full h-full object-contain " />
            </div>
            {/* <div className="p-3  bg-gray-50 ">
            <div className="text-slate-700 text-sm font-semibold mb-2  group-hover:underline">{title}</div>
            <div className="text-gray-500 text-xs  max-h-20 min-h-20">{description}</div>
            <div className="text-gray-500 text-xs  max-h-20 min-h-20">{price}</div> */}

            {/* <div className="p-4"> */}
            {/* Product Title */}
            <h3 className="text-lg font-semibold">{title}</h3>
            {/* Product Description */}
            <p className="text-gray-600 text-sm mt-2">{description}</p>
            <div className="flex justify-between items-center mt-4">
              {/* Product Price */}
                    <p className="text-xl font-semibold text-red-600">${price}</p>
              {/* Add to Cart Button or any other action */}
                {/* <button
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                Add to Cart
                </button> */}
                <button
                    onClick={() => addToCart(data)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard