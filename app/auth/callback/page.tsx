'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error getting session:', sessionError)
          router.push('/auth/signin')
          return
        }

        if (!session) {
          // Try to refresh the session
          const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession()
          
          if (refreshError || !refreshedSession) {
            console.error('Error refreshing session:', refreshError)
            router.push('/auth/signin')
            return
          }
        }

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            console.log('Auth state changed: SIGNED_IN')
            router.push('/dashboard')
          } else if (event === 'SIGNED_OUT') {
            console.log('Auth state changed: SIGNED_OUT')
            router.push('/auth/signin')
          }
        })

        // If we have a session, redirect to dashboard
        if (session) {
          console.log('Session established, redirecting to dashboard')
          router.push('/dashboard')
        }

        // Cleanup subscription
        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error('Error in auth callback:', error)
        router.push('/auth/signin')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-signal-green">Completing sign in...</h2>
        <p className="text-slate-400">Please wait while we redirect you.</p>
      </div>
    </div>
  )
} 