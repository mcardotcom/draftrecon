import React, { createContext, useContext } from 'react';
import { supabase } from './supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';

// Create a context with the Supabase client
const SupabaseContext = createContext<SupabaseClient | null>(null);

// Provider that wraps the app or test component tree
export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Hook to access the Supabase client anywhere
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}; 