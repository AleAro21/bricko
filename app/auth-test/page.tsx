// AuthTestPage.tsx
'use client';

import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import AmplifyProvider from '@/components/providers/AmplifyProvider'; // Import the AmplifyProvider

export default function AuthTestPage() {
  return (
    <AmplifyProvider>
      <div className="min-h-screen p-8">
        <div className="max-w-md mx-auto">
          <Authenticator>
            {({ user, signOut }) => (
              <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
                <p className="mb-4">You are now signed in as {user?.username}</p>
                <button
                  onClick={signOut}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </Authenticator>
        </div>
      </div>
    </AmplifyProvider>
  );
}
