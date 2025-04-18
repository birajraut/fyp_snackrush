import {authApi} from "./axios"
export const createSale = async  (data:any)=>{
    return authApi.post('/sale', {...data})
}

export const listOrder = async  ({user_id,restaurant_id})=>{
    return restaurant_id ? authApi.post('/restaurant/sale', {restaurant_id}) : authApi.post('/restaurant/sale',{user_id})
}
