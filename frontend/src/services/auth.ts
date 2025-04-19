/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from './axios';

export const login = async (data: any) => {
  return authApi.post('/auth/login', { ...data });
};

export const register = async (data: any) => {
  return authApi.post('/auth/register', { ...data });
};

export const OPTPVerify = async (data: any) => {
  return authApi.post('/auth/otp-verify', { ...data });
};

// await axios.post('http://localhost:8000/api/auth/otp-verify', {
//   otp: values?.otp,
//   email: values?.email,
// });
