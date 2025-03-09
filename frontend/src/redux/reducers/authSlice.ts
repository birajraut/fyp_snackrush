import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from '../../types/redux'
import { IUserResponse } from '../../types/user'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: IAuth = {
    accessToken: '',
    refreshToken: '',
    user: null
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
        }
    }

})


export const { setAccessToken, setRefreshToken,setUser } = authSlice.actions

export default authSlice.reducer