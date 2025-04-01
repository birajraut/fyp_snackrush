import {authApi} from "./axios"
export const login = async  (data:any)=>{
    return authApi.post('/auth/login', {...data})
}

export const restaurantLogin = async(data:any)=>{
    return authApi.post('/restaurant/login', {...data})
}