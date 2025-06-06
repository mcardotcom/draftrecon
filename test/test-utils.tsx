import React from 'react';
import { render } from '@testing-library/react';
import { SupabaseProvider } from '@/lib/SupabaseContext';

export function renderWithProviders(ui: React.ReactElement) {
  return render(<SupabaseProvider>{ui}</SupabaseProvider>);
} 