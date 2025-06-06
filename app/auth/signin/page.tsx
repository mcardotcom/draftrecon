'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const router = useRouter()

  const handleSendCode = async (e: React.FormEvent) => {
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
          shouldCreateUser: false // Only allow existing users to sign in
        }
      })

      if (error) {
        throw error
      }

      setMessage('Please check your email for the 6-digit verification code.')
      setShowCodeInput(true)
    } catch (error: any) {
      console.error('Send code error:', error)
      setError(error.message || 'An error occurred while sending the code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      if (!code) {
        throw new Error('Verification code is required')
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      })

      if (error) {
        throw error
      }

      // Successful verification will trigger the auth state change
      // and the AuthCheck component will handle the redirect
      setMessage('Verification successful! Redirecting...')
    } catch (error: any) {
      console.error('Verify code error:', error)
      setError(error.message || 'An error occurred while verifying the code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
      <div className="card max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign in to DraftRecon</h2>
        {!showCodeInput ? (
          <form onSubmit={handleSendCode} className="space-y-4">
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
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <input
              className="input"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={6}
              required
            />
            <button 
              className="btn-primary w-full" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <button
              type="button"
              className="text-signal-green hover:underline text-sm"
              onClick={() => {
                setShowCodeInput(false)
                setCode('')
                setMessage('')
              }}
            >
              Use a different email
            </button>
          </form>
        )}
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