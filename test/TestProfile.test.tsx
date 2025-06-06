import React from 'react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '@/test/test-utils';
import TestProfile from '@/lib/components/TestProfile';

describe('TestProfile Component', () => {
  it('renders with Supabase context', () => {
    const { getByText } = renderWithProviders(<TestProfile />);
    expect(getByText('Connected to Supabase')).toBeInTheDocument();
    expect(getByText('Client Initialized: Yes')).toBeInTheDocument();
  });
}); 