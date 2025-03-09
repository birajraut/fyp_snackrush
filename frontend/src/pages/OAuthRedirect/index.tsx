import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('accessToken');
  const refreshToken = queryParams.get('refreshToken');

  useEffect(() => {
    console.log({ accessToken, refreshToken });

    // Check if neither token exists, and if so, redirect to home
    if (!accessToken && !refreshToken) {
      navigate('/');
      return;
    }

    // If access token exists, store it in localStorage
    if (accessToken) {
      localStorage.setItem('token', accessToken);
    }

    // Redirect the user after storing the token
    navigate('/');
  }, [accessToken, refreshToken, navigate]);

  return <p>Redirecting...</p>;
};

export default OAuthRedirect;
