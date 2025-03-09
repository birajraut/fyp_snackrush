import {IUserResponse} from "./user"
export  interface IAuth {
    accessToken:string | null
    refreshToken :string | null
    user:IUserResponse | null
}

export interface IRootReducer {
    auth:IAuth
}