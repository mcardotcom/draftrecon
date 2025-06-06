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
      console.log('Storage getItem called in server context')
      return null
    }
    try {
      const value = localStorage.getItem(key)
      console.log('Storage getItem:', key, value ? 'value present' : 'no value')
      return value
    } catch (error) {
      console.error('Storage getItem error:', error)
      return null
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') {
      console.log('Storage setItem called in server context')
      return
    }
    try {
      console.log('Storage setItem:', key, 'value length:', value.length)
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Storage setItem error:', error)
    }
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') {
      console.log('Storage removeItem called in server context')
      return
    }
    try {
      console.log('Storage removeItem:', key)
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