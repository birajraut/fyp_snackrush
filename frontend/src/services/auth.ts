import {authApi} from "./axios"
export const login = async  (data:any)=>{
    return authApi.post('/auth/login', {...data})
}