"use client";
import React from "react";

/**
 * Mock Google OAuth Provider for Development
 * 
 * This component provides a mock implementation of GoogleOAuthProvider
 * for development environments when OAuth credentials are not configured.
 * 
 * In production, this should be replaced with the actual @react-oauth/google
 * GoogleOAuthProvider with proper environment variables.
 */
const MockGoogleOAuthProvider = ({ children }) => {
  // Mock context value that simulates being authenticated
  const mockContext = {
    // Add any mock Google OAuth context methods/values here if needed
    init: () => Promise.resolve(),
    signIn: () => Promise.resolve({}),
    signOut: () => Promise.resolve(),
  };

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '🔧 Using Mock Google OAuth Provider for development.\n' +
        '⚠️  Set NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY in .env.local for production OAuth.'
      );
    }
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default MockGoogleOAuthProvider;