import { AxiosError } from 'axios';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom'
import * as Yup from 'yup';

const OtpVerificationPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isOAuth = queryParams.get("fromOauth");
    const oAuthEmail = queryParams.get("email");

    const emailForOTP= localStorage.getItem('email')
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: isOAuth ? oAuthEmail : emailForOTP,
            otp: '',
        },
        validationSchema: Yup.object({
        otp: Yup.string().length(6, 'OTP must be exactly 6 digits').required('OTP is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
            await axios.post('http://localhost:8000/api/auth/otp-verify', { otp: values?.otp,email:values?.email });
            alert('OTP Verified Successfully');
            navigate('/login');
        } catch (error) {
            if (error instanceof AxiosError) {
            setErrors({ otp: error.response?.data.message || 'Invalid OTP' });
            } else {
            setErrors({ otp: 'An unknown error occurred' });
            }
        }
        setSubmitting(false);
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800">OTP Verification</h2>
            <p className="text-center text-gray-600">Enter the OTP sent to your email</p>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" disabled  value={formik.values.email ?? ""} className="border p-2 w-full" />
            </div>
            <div>
                <label htmlFor="otp">OTP</label>
                <input type="text" id="otp" name="otp" onChange={formik.handleChange} value={formik.values.otp} className="border p-2 w-full" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2">Verify OTP</button>
            </form>
        </div>
        </div>
    );
};

export default OtpVerificationPage;