import { AxiosError } from 'axios';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post('http://localhost:8000/api/auth/forgot-password', values);
        alert('Verification code sent to your email');
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrors({ email: error.response?.data.message || 'An error occurred' });
        } else {
          setErrors({ email: 'An unknown error occurred' });
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Verification Code
            </button>
          </div>
        </form>
        
        {/* Go to Login */}
        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
