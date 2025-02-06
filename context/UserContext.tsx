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

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshUser = async () => {
    const savedUserId = sessionStorage.getItem('userId');
    if (!savedUserId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      // Check for stored user data first
      const storedUser = sessionStorage.getItem('userObject');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Only fetch if we don't have stored data
        const updatedUser = await apiService.getUser(savedUserId);
        setUser(updatedUser);
        // Store the fetched user data
        sessionStorage.setItem('userObject', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
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