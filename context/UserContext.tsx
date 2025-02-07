"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { apiService } from '@/app/apiService';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// How often to refresh user data (in milliseconds)
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const refreshUser = async (force: boolean = false) => {
    const savedUserId = sessionStorage.getItem('userId');
    if (!savedUserId) {
      setLoading(false);
      return;
    }

    // If not forced, check if we should refresh based on time
    if (!force && Date.now() - lastFetch < REFRESH_INTERVAL) {
      return;
    }
    
    try {
      setLoading(true);
      // Always fetch fresh data from the server
      const updatedUser = await apiService.getUser(savedUserId);
      setUser(updatedUser);
      // Update sessionStorage with latest data
      sessionStorage.setItem('userObject', JSON.stringify(updatedUser));
      setLastFetch(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
      // On error, try to use cached data as fallback
      const storedUser = sessionStorage.getItem('userObject');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    refreshUser(true);
  }, []);

  // Set up periodic refresh
  useEffect(() => {
    const interval = setInterval(() => {
      refreshUser();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [lastFetch]);

  // Refresh when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshUser();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      error, 
      refreshUser: () => refreshUser(true) 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}