'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          router.push('/auth/signin')
          return
        }

        if (session) {
          console.log('Session established, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          console.log('No session found, redirecting to sign in')
          router.push('/auth/signin')
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