import axios from 'axios'

 
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URI,
    // timeout: 50000,
    timeoutErrorMessage: 'server timed out',
    withCredentials: true,
})
 
authApi.interceptors.request.use(
    (config) => {
       
        return config
    },
    (error) => Promise.reject(error)
)
 
authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)
 
 