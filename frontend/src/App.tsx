

import {Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/register'
import HomePage from './pages/homepage'
import OtpVerificationPage from './pages/verifyOTP'
import AboutUs from './pages/aboutUs'
import ProfilePage from './pages/profile'
import RestaurantPage from './pages/restaurantPage'
import LoginPage from "./pages/login/index"
import BlogPage from "./pages/blog"
import ContactUs from  "./pages/contactUS"
import OAuthRedirect from  "./pages/OAuthRedirect"
import UserLayout from  "./components/layout/UserLayout"

const  App = () => {

  return (
    <Routes>
      <Route  path='/register' element={<RegisterPage />} /> 
      <Route  path='/login' element={<LoginPage />} /> 

      <Route  path='/verifyOTP' element={<OtpVerificationPage />} /> 
 
      <Route  path='/redirect-oAuth' element={<OAuthRedirect/>} /> 

      <Route path='/' element={<UserLayout />} >
      <Route  index element={<HomePage />} /> 
      <Route  path='/aboutUs' element={<AboutUs />} /> 
      <Route  path='/profile' element={<ProfilePage/>} /> 
      <Route  path='/restaurantPage' element={<RestaurantPage />} /> 
      <Route  path='/blog' element={< BlogPage/>} /> 
      <Route  path='/contactUs' element={< ContactUs/>} /> 


      </Route>
      
      {/* <Route  path='/forget-password' element={<ForgotPassword />} />  */}
      
    </Routes>
  )
}

export default App
