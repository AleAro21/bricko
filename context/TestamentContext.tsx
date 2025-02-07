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
  birthDate: string | null;
  nationality?: string;
  gender?: string;
  phoneNumber?: string;
  countryPhoneCode?: string;
}

export interface ContactInfo {
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  phone?: string;
}

export interface TestamentProgress {
  personalInfo: {
    name: number;
    basic: number;
    partner: number;
    children: number;
    parents: number;
    total: number;
  };
  assets: number;
  inheritance: number;
  executors: number;
  specialGifts: number;
  digitalAssets: number;
}

interface TestamentContextType {
  personalInfo: PersonalInfo | null;
  contactInfo: ContactInfo | null;
  setPersonalInfo: (info: PersonalInfo) => void;
  setContactInfo: (info: ContactInfo) => void;
  progress: TestamentProgress;
  updateProgress: (section: keyof TestamentProgress, value: number) => void;
  updatePersonalInfoProgress: (subsection: keyof TestamentProgress['personalInfo'], value: number) => void;
  loading: boolean;
  error: Error | null;
  savePersonalInfo: (info: PersonalInfo) => Promise<void>;
  saveContactInfo: (info: ContactInfo) => Promise<void>;
}

const defaultProgress: TestamentProgress = {
  personalInfo: {
    name: 0,
    basic: 0,
    partner: 0,
    children: 0,
    parents: 0,
    total: 0
  },
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
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [progress, setProgress] = useState<TestamentProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Calculate personal info section progress
  const calculatePersonalInfoProgress = () => {
    const sections = ['name', 'basic', 'partner', 'children', 'parents'];
    const completedSections = sections.reduce((total, section) => {
      return total + (progress.personalInfo[section as keyof typeof progress.personalInfo] === 100 ? 1 : 0);
    }, 0);
    
    const totalProgress = (completedSections / sections.length) * 100;
    
    setProgress(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        total: totalProgress
      }
    }));
  };

  // Load initial data
  useEffect(() => {
    const loadTestamentData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Initialize personal info if user data exists
        if (user.name) {
          const personalData = {
            name: user.name,
            middleName: user.middleName || '',
            fatherLastName: user.fatherLastName || '',
            motherLastName: user.motherLastName || '',
            taxId: '',
            birthDate: null,
            nationality: user.nationality,
            gender: user.gender
          };
          
          setPersonalInfo(personalData);
          
          // Update progress for name section if all required fields are present
          if (user.name && user.fatherLastName && user.motherLastName) {
            updatePersonalInfoProgress('name', 100);
          }
        }
        
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load testament data'));
      } finally {
        setLoading(false);
      }
    };

    loadTestamentData();
  }, [user?.id]);

  // Update progress whenever personal info sections change
  useEffect(() => {
    calculatePersonalInfoProgress();
  }, [progress.personalInfo.name, progress.personalInfo.basic, progress.personalInfo.partner, 
      progress.personalInfo.children, progress.personalInfo.parents]);

  const updateProgress = (section: keyof TestamentProgress, value: number) => {
    setProgress(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const updatePersonalInfoProgress = (subsection: keyof TestamentProgress['personalInfo'], value: number) => {
    setProgress(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [subsection]: value
      }
    }));
  };

  const savePersonalInfo = async (info: PersonalInfo) => {
    if (!user?.id) throw new Error('User not found');

    try {
      setLoading(true);
      setPersonalInfo(info);
      updatePersonalInfoProgress('name', 100);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save personal info'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveContactInfo = async (info: ContactInfo) => {
    if (!user?.id) throw new Error('User not found');

    try {
      setLoading(true);
      setContactInfo(info);
      updatePersonalInfoProgress('basic', 100);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save contact info'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TestamentContext.Provider 
      value={{
        personalInfo,
        contactInfo,
        setPersonalInfo,
        setContactInfo,
        progress,
        updateProgress,
        updatePersonalInfoProgress,
        loading,
        error,
        savePersonalInfo,
        saveContactInfo,
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