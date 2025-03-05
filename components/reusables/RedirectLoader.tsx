'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/reusables/Spinner'; // adjust the import path as needed

const RedirectLoader: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear session storage and local storage.
    sessionStorage.clear();
    localStorage.clear();

    // Clear all cookies accessible via JavaScript.
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Redirect after 3 seconds; adjust the timeout as needed.
    const timer = setTimeout(() => {
      router.push('/start/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {/* Render a big blue spinner */}
      <Spinner size={100} color="#047aff" />
    </div>
  );
};

export default RedirectLoader;
