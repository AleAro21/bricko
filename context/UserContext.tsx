"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  let lastFetch = Date.now();

  // 🛑 Prevent duplicate API calls
  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user', { credentials: 'include' });
      if (!response.ok) {
        setUser(null);
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      if (JSON.stringify(user) !== JSON.stringify(data.user)) {
        setUser(data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [user]);
  

  // 🔹 Fetch user **once** when the component mounts
  useEffect(() => {
    refreshUser();
  }, []);

  // 🔹 Fetch user **every 5 minutes**
  useEffect(() => {
    const interval = setInterval(refreshUser, REFRESH_INTERVAL);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // 🔹 Fetch user **on tab focus**
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetch > 5000) {
        refreshUser();
        lastFetch = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, refreshUser }}>
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
