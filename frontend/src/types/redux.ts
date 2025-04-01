import {IUserResponse} from "./user"

export interface IRestaurant{
    id:string,
    name:string
}
export  interface IAuth {
    accessToken:string | null
    refreshToken :string | null
    user:IUserResponse | null
    restaurant:IRestaurant
}

export interface IRootReducer {
    auth:IAuth


}