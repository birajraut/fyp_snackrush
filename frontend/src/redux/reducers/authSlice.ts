import { createSlice } from "@reduxjs/toolkit";
import { IAuth, IRestaurant } from '../../types/redux'
import { IUserResponse } from '../../types/user'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: IAuth = {
    accessToken: '',
    refreshToken: '',
    user: null,
    restaurant:{
        id: "",
        name: ""
    }
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refreshToken = action.payload
        },
        setUser: (state, action: PayloadAction<IUserResponse | null>) => {
            state.user = action.payload
        },
        setRestaurant: (state, action: PayloadAction<IRestaurant | null>) => {
            state.restaurant = action.payload
        }
    }

})


export const { setAccessToken,setRestaurant, setRefreshToken,setUser } = authSlice.actions

export default authSlice.reducer