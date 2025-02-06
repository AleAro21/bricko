'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { apiService } from '@/app/apiService';

// Types
export interface PersonalInfo {
  name: string;
  middleName: string;
  fatherLastName: string;
  motherLastName: string;
  taxId: string;
  birthDate: Date | null;
  countryCode?: string;
  gender?: string;
}

export interface TestamentProgress {
  personalInfo: number;
  assets: number;
  inheritance: number;
  executors: number;
  specialGifts: number;
  digitalAssets: number;
}

interface TestamentContextType {
  personalInfo: PersonalInfo | null;
  setPersonalInfo: (info: PersonalInfo) => void;
  progress: TestamentProgress;
  updateProgress: (section: keyof TestamentProgress, value: number) => void;
  loading: boolean;
  error: Error | null;
  savePersonalInfo: (info: PersonalInfo) => Promise<void>;
}

const defaultProgress: TestamentProgress = {
  personalInfo: 0,
  assets: 0,
  inheritance: 0,
  executors: 0,
  specialGifts: 0,
  digitalAssets: 0,
};

const TestamentContext = createContext<TestamentContextType | undefined>(undefined);

export function TestamentProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [progress, setProgress] = useState<TestamentProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial data
  useEffect(() => {
    const loadTestamentData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        // const testamentData = await apiService.getTestamentData(user.id);
        // const progressData = await apiService.getTestamentProgress(user.id);
        
        // For now, initialize with user data we already have
        if (user.name) {
          setPersonalInfo({
            name: user.name,
            middleName: user.middleName || '',
            fatherLastName: user.fatherLastName || '',
            motherLastName: user.motherLastName || '',
            taxId: '',
            birthDate: null,
          });
        }
        
        setProgress(defaultProgress);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load testament data'));
      } finally {
        setLoading(false);
      }
    };

    loadTestamentData();
  }, [user?.id]);

  const updateProgress = (section: keyof TestamentProgress, value: number) => {
    setProgress(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const savePersonalInfo = async (info: PersonalInfo) => {
    if (!user?.id) throw new Error('User not found');

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // await apiService.savePersonalInfo(user.id, info);
      
      setPersonalInfo(info);
      updateProgress('personalInfo', 100);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save personal info'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TestamentContext.Provider 
      value={{
        personalInfo,
        setPersonalInfo,
        progress,
        updateProgress,
        loading,
        error,
        savePersonalInfo,
      }}
    >
      {children}
    </TestamentContext.Provider>
  );
}

export function useTestament() {
  const context = useContext(TestamentContext);
  if (context === undefined) {
    throw new Error('useTestament must be used within a TestamentProvider');
  }
  return context;
}