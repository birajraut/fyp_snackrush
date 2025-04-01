

import {Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/register'
import HomePage from './pages/homepage'
import OtpVerificationPage from './pages/verifyOTP'
import AboutUs from './pages/aboutUs'
import ProfilePage from './pages/profile'
import RestaurantPage from './pages/restaurantPage'
import LoginPage from "./pages/login/index"
import BlogPage from "./pages/blog"

import CartPage from "./pages/cart/cart"
import CheckoutPage from "./pages/checkout/checkout"
import SuccessPage from "./pages/success"
import OrderPage from "./pages/order"
import ContactUsPage from  "./pages/contactUS/index"
import OAuthRedirect from  "./pages/OAuthRedirect"
import UserLayout from  "./components/layout/UserLayout"
import RestaurantDetail from "./pages/restaurantPage/restaurantDetails"
import RestaurantLoginPage from "./pages/login/restaurantLogin"
import { useSelector } from 'react-redux'



const  App = () => {
const {user,restaurant}=useSelector(state=>state?.auth)
console.log(user,'user')
  return (
    <Routes >
      <Route  path='/register' element={<RegisterPage />} /> 
      <Route  path='/login' element={<LoginPage />} /> 
      <Route  path='/restaurantlogin' element={<RestaurantLoginPage />} /> 

      <Route  path='/verifyOTP' element={<OtpVerificationPage />} /> 
 
      <Route  path='/redirect-oAuth' element={<OAuthRedirect/>} /> 

  {user?    <Route path='/' element={<UserLayout />} >
      <Route  index element={<HomePage />} /> 
      <Route  path='/aboutUs' element={<AboutUs />} /> 
      <Route  path='/profile' element={<ProfilePage/>} /> 
      <Route  path='/cart' element={<CartPage/>} /> 
      <Route  path='/checkout' element={<CheckoutPage/>} /> 
      <Route  path='/success' element={<SuccessPage/>} /> 
      <Route  path='/orders' element={<OrderPage/>} /> 

      <Route  path='/restaurants' element={<RestaurantPage />} /> 
      <Route  path='/blog' element={< BlogPage/>} /> 
      <Route  path='/contactUs' element={< ContactUsPage/>} /> 
      <Route  path='/restaurant/details/:id' element={<RestaurantDetail />} /> 


      </Route>:restaurant?.id? <Route path='/' element={<UserLayout />} >
      <Route  index element={<RestaurantDetail />} /> 
      <Route  path='/aboutUs' element={<AboutUs />} /> 
      <Route  path='/profile' element={<ProfilePage/>} /> 
      <Route  path='/cart' element={<CartPage/>} /> 
      <Route  path='/checkout' element={<CheckoutPage/>} /> 
      <Route  path='/success' element={<SuccessPage/>} /> 
      <Route  path='/orders' element={<OrderPage/>} /> 

      <Route  path='/restaurants' element={<RestaurantPage />} /> 
      <Route  path='/blog' element={< BlogPage/>} /> 
      <Route  path='/contactUs' element={< ContactUsPage/>} /> 
      <Route  path='/restaurant/details/:id' element={<RestaurantDetail />} /> 


      </Route>:
      <Route path='/' element={<UserLayout />} >
                <Route  index element={<HomePage />} /> 
                <Route  path='/aboutUs' element={<AboutUs />} /> 
                <Route  path='/blog' element={< BlogPage/>} /> 

                </Route>
}
      
      {/* <Route  path='/forget-password' element={<ForgotPassword />} />  */}
      
    </Routes>
  )
}

export default App
