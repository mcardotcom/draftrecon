'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      if (!email) {
        throw new Error('Email is required')
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        throw error
      }

      setMessage('Check your email for the magic link to sign in.')
    } catch (error: any) {
      console.error('Sign in error:', error)
      setError(error.message || 'An error occurred while sending the magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
      <div className="card max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign in to DraftRecon</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
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
        </form>
        {message && (
          <div className="text-signal-green text-center mt-4">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
        <div className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-signal-green hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
} 