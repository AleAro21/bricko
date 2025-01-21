// AmplifyProvider.tsx
'use client';

import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsConfig from '../../aws-exports';  // Ensure the path is correct
import '@aws-amplify/ui-react/styles.css';

interface AmplifyProviderProps {
  children: React.ReactNode;
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Correctly apply the Amplify configuration
        Amplify.configure(awsConfig);
        console.log('Amplify configured successfully');
      } catch (error) {
        console.error('Error configuring Amplify:', error);
      }
    }
  }, []);

  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
