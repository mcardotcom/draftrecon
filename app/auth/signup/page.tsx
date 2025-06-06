'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      if (!email || !fullName) {
        throw new Error('Email and full name are required')
      }

      // First, sign up the user with metadata
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password: crypto.randomUUID(), // Generate a random password since we're using magic links
        options: {
          data: {
            full_name: fullName,
            role: 'talent'
          }
        }
      })

      if (signUpError) {
        throw signUpError
      }

      // Then send the magic link
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (otpError) {
        throw otpError
      }

      setMessage('Please check your email for the magic link. If you don\'t see it, check your spam folder.')
    } catch (error: any) {
      console.error('Sign up error:', error)
      setError(error.message || 'An error occurred during sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
      <div className="card max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign up for DraftRecon</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            className="input"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
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
            {loading ? 'Sending...' : 'Sign Up'}
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
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-signal-green hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 