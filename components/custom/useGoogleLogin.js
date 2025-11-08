"use client";
import React from "react";

/**
 * Mock useGoogleLogin hook for Development
 * 
 * This provides a mock implementation of the useGoogleLogin hook
 * from @react-oauth/google for development environments.
 * 
 * It simulates a successful Google login with mock user data.
 */
const useGoogleLogin = ({ onSuccess, onError }) => {
  const mockLogin = React.useCallback(() => {
    // Simulate async login process
    setTimeout(() => {
      const mockUserResponse = {
        access_token: "mock_access_token_for_development",
        token_type: "Bearer",
        expires_in: 3600,
        scope: "openid email profile",
      };

      // Simulate successful login with mock user data
      const mockUserInfo = {
        data: {
          id: "123456789",
          email: "dev.user@astra-ai.local",
          name: "Development User",
          picture: "/user.jpg",
          given_name: "Development",
          family_name: "User",
        }
      };

      // Call the success callback with mock data
      if (onSuccess) {
        onSuccess(mockUserResponse);
        
        // Simulate the axios.get call that would normally happen
        setTimeout(() => {
          // This simulates the successful userInfo fetch
          console.log('🔧 Mock Google Login Successful:', mockUserInfo.data);
        }, 100);
      }
    }, 500); // Simulate network delay
  }, [onSuccess]);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '🔧 Using Mock useGoogleLogin hook for development.\n' +
        '⚠️  Configure Google OAuth for production authentication.'
      );
    }
  }, []);

  return mockLogin;
};

export default useGoogleLogin;