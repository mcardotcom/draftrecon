"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // First check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (session) {
          console.log('Session exists, redirecting to dashboard...')
          router.push('/dashboard')
          return
        }

        // If no session, check for auth tokens in URL
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')
        
        if (accessToken && refreshToken) {
          console.log('Found auth tokens, setting session...')
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (error) {
            console.error('Error setting session:', error)
            setMessage('Error signing in. Please try again.')
          } else {
            console.log('Session set successfully, redirecting to dashboard...')
            router.push('/dashboard')
          }
        }
      } catch (error) {
        console.error('Error in auth callback:', error)
        setMessage('Error signing in. Please try again.')
      }
    }

    handleAuthCallback()
  }, [router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      console.log('Attempting to sign in with email:', email)
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: fullName || email.split('@')[0],
          }
        },
      })

      if (error) {
        console.error('Sign in error:', error)
        if (error.message.includes('Database error')) {
          setMessage('Unable to create account. Please try again later.')
        } else {
          setMessage(error.message)
        }
      } else {
        console.log('Magic link sent successfully:', data)
        setMessage('Check your email for the magic link!')
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Check if we're handling the auth callback
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const isHandlingCallback = hash.includes('access_token') && hash.includes('refresh_token')

  if (isHandlingCallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Completing sign in...</h2>
          <p>Please wait while we redirect you to the dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
      <form onSubmit={handleSignIn} className="card max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign in to DraftRecon</h2>
        <div className="space-y-4">
          <input
            className="input"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button 
            className="btn-primary w-full" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </div>
        {message && (
          <div className={`text-center mt-2 ${
            message.includes('Check your email') 
              ? 'text-signal-green' 
              : 'text-error-red'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
} 