import {authApi} from "./axios"


export const userDetails = async  ()=>{
  return authApi.get(`/user`)
}