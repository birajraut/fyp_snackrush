import {authApi} from "./axios"
export const createSale = async  (data:any)=>{
    return authApi.post('/sale', {...data})
}

export const listOrder = async  ()=>{
    return authApi.get('/sale')
}