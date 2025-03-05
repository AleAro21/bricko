'use client';

import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import awsConfig from '../../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { apiService } from '@/app/apiService';
import LoadingFallback from '@/components/common/LoadingFallback';

interface AmplifyProviderProps {
  children: React.ReactNode;
}

function AuthStateManager({ children }: { children: React.ReactNode }) {
  const { authStatus, user } = useAuthenticator((context) => [context.authStatus, context.user]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const updateTokenCookie = async () => {
      try {
        if (authStatus === 'authenticated' && user) {
          const session = await fetchAuthSession();
          const token = session.tokens?.accessToken?.toString();
          const userId = user.userId; // In v6, the user ID is likely in userId
          
          if (token) {
            // Update token in service
            apiService.setToken(token);
            
            // Set cookies that server-side code can access
            document.cookie = `token=${token}; path=/; max-age=${60 * 60}; SameSite=Strict; secure`;
            if (userId) {
              document.cookie = `userId=${userId}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; secure`;
            }
            
            // Add a hidden input with the token that can be referenced by server components
            // This is a backup method if cookies aren't working
            const existingInput = document.getElementById('auth-token-input');
            if (existingInput) {
              (existingInput as HTMLInputElement).value = token;
            } else {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.id = 'auth-token-input';
              input.value = token;
              document.body.appendChild(input);
            }
          }
        } else if (authStatus === 'unauthenticated') {
          // Clear cookies on logout
          document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
          document.cookie = 'userId=; path=/; max-age=0; SameSite=Strict';
          
          // Remove the hidden input
          const input = document.getElementById('auth-token-input');
          if (input) {
            input.remove();
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error updating token cookie:', error);
        setIsInitialized(true);
      }
    };

    updateTokenCookie();
    
    // Set up refresh interval for the token
    const refreshInterval = setInterval(async () => {
      if (authStatus === 'authenticated') {
        try {
          const newToken = await apiService.refreshToken();
          document.cookie = `token=${newToken}; path=/; max-age=${60 * 60}; SameSite=Strict; secure`;
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Token refresh interval failed:', error);
        }
      }
    }, 45 * 60 * 1000); // Refresh every 45 minutes
    
    return () => clearInterval(refreshInterval);
  }, [authStatus, user]);

  // Add a shorter interval check to ensure we always have a valid token
  useEffect(() => {
    if (authStatus === 'authenticated') {
      const quickCheck = setInterval(async () => {
        const tokenCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='));
          
        if (!tokenCookie) {
          console.log('Token cookie disappeared, refreshing...');
          try {
            const newToken = await apiService.refreshToken();
            document.cookie = `token=${newToken}; path=/; max-age=${60 * 60}; SameSite=Strict; secure`;
          } catch (error) {
            console.error('Quick token refresh failed:', error);
          }
        }
      }, 60 * 1000); // Check every minute
      
      return () => clearInterval(quickCheck);
    }
  }, [authStatus]);

  return isInitialized ? children : <LoadingFallback />;
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        Amplify.configure(awsConfig);
        console.log('Amplify configured successfully');
      } catch (error) {
        console.error('Error configuring Amplify:', error);
      }
    }
  }, []);

  return (
    <Authenticator.Provider>
      <AuthStateManager>{children}</AuthStateManager>
    </Authenticator.Provider>
  );
}