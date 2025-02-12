'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { apiService } from '@/app/apiService';
import { Contact } from '@/types'; // Import your existing Contact interface

interface ContactContextType {
  contact: Contact | null;
  setContact: (contact: Contact | null) => void;
  loading: boolean;
  error: Error | null;
  saveContact: (contactData: Contact) => Promise<void>;
  // deleteContact: () => Promise<void>;
  refreshContact: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshContact = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const contactData = await apiService.getContact(contact?.id || '');
      setContact(contactData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch contact'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshContact();
  }, [user?.id]);

  const saveContact = async (contactData: Contact) => {
    if (!user?.id) throw new Error('User not found');

    try {
      setLoading(true);
      const savedContact = await apiService.createContact(user.id, contactData);
      setContact(savedContact);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save contact'));
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <ContactContext.Provider
      value={{
        contact,
        setContact,
        loading,
        error,
        saveContact,

        refreshContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
}