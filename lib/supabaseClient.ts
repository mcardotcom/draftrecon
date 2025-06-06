import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing'
  })
  throw new Error('Missing Supabase environment variables')
}

console.log('Initializing Supabase client with URL:', supabaseUrl)

// Create a custom storage implementation that works in both server and client
const customStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') {
      return null
    }
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Storage getItem error:', error)
      return null
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') {
      return
    }
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Storage setItem error:', error)
    }
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') {
      return
    }
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Storage removeItem error:', error)
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'draftrecon.auth.token',
    storage: customStorage
  },
  global: {
    headers: {
      'x-application-name': 'draftrecon'
    }
  }
})

// Add error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session ? 'session present' : 'no session')
}) 