"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth/signin')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-signal-green">Redirecting...</h2>
        <p className="text-slate-400">Please wait while we redirect you to the sign in page.</p>
      </div>
    </div>
  )
} 