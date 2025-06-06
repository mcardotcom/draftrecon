"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error || !user) {
          router.push('/auth')
        } else {
          setUser(user)
        }
      } catch (error) {
        console.error('Error checking user:', error)
        router.push('/auth')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-slate">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-slate text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to DraftRecon</h1>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-4">
            <div>
              <p className="text-slate-400">Email</p>
              <p>{user?.email}</p>
            </div>
            <div>
              <p className="text-slate-400">Name</p>
              <p>{user?.user_metadata?.full_name || 'Not set'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/auth')
          }}
          className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
} 