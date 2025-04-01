import StriteElement from "./StriteElement"; // Fixed the typo here

import {createSale } from '../../services/sale'
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const cart= useSelector(state=>state.cart.cart)
const dispatch= useDispatch()
const navigate = useNavigate()
// const cartPayload =cart.
const payload = cart.map(item => ({
    product_id: item._id,
    price: item.price * item.quantity
}));

    //     const payload = [
    //         {
    //         product_id:'ghjkl',
    //         price:345678
    //     },
    //     {
    //         product_id:'ghjkl',
    //         price:345678
    //     }
    // ]

    const submitFn = async  (data:any)=>{


        const res = await  createSale({
            ...data,
            products:payload
        })
        // console.log('res sale', res?.status===200)
        if(res?.status===200){
            dispatch(resetCart())
            navigate("/success")
        }
        
    }
   return (
    <>
      <StriteElement submitFn={submitFn} />
    </>
   );
};

export default CheckoutPage;
