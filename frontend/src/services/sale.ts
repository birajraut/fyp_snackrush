import {authApi} from "./axios"
export const createSale = async  (data:any)=>{
    return authApi.post('/sale', {...data})
}

export const listOrder = async  (restaurant_id:string)=>{
    return authApi.post('/restaurant/sale', {restaurant_id})
}