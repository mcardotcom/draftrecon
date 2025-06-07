'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
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
      if (!email || !name || !username) {
        throw new Error('Email, name, and username are required')
      }

      // Check if username is already taken
      const { data: existingUsers, error: checkError } = await supabase
        .from('talent_profiles')
        .select('username')
        .ilike('username', username)

      if (checkError) {
        console.error('Error checking username:', checkError)
        throw new Error('Error checking username availability')
      }

      if (existingUsers && existingUsers.length > 0) {
        throw new Error('This username is already taken. Please choose another one.')
      }

      // Sign up the user with metadata matching the new schema
      console.log('Attempting signup with:', { email, name, username })
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: crypto.randomUUID(), // Generate a random password since we're using magic links
        options: {
          data: {
            name,
            username,
            role: 'talent' // Explicitly set role to ensure correct profile creation
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      console.log('Signup response:', { data: signUpData, error: signUpError })

      if (signUpError) {
        console.error('Signup error:', signUpError)
        if (signUpError.message.includes('rate limit')) {
          throw new Error('Too many signup attempts. Please wait 60 seconds before trying again.')
        }
        throw signUpError
      }

      if (!signUpData?.user) {
        throw new Error('Failed to create user account')
      }

      // Log the user data to verify metadata
      console.log('Created user:', {
        id: signUpData.user.id,
        email: signUpData.user.email,
        metadata: signUpData.user.user_metadata
      })

      // Check if email confirmation is required
      if (signUpData.user.confirmed_at === null) {
        setMessage('Please check your email for the magic link. If you don\'t see it, check your spam folder.')
      } else {
        setMessage('Account created successfully! You can now log in.')
      }
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
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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