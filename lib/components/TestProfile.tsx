'use client';
import React from 'react';
import { useSupabase } from '@/lib/SupabaseContext';

export default function TestProfile() {
  const supabase = useSupabase();

  return (
    <div>
      <h1>Connected to Supabase</h1>
      <p>Client Initialized: {supabase ? 'Yes' : 'No'}</p>
    </div>
  );
} 