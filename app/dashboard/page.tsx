"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AuthCheck from '@/components/AuthCheck'
import { Profile } from '@/lib/types'
import Image from 'next/image'
import { GlobeAltIcon, MapPinIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/dashboard/Sidebar'
import ProfileHeader from '@/components/dashboard/ProfileHeader'
import Card from '@/components/dashboard/Card'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const setupProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/auth/signin')
          return
        }

        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (existingProfile) {
          // Update confirmed status if user has clicked magic link
          if (!existingProfile.confirmed && session.user.email_confirmed_at) {
            const { data: updatedProfile, error: updateError } = await supabase
              .from('profiles')
              .update({ confirmed: true })
              .eq('id', session.user.id)
              .select()
              .single()

            if (updateError) throw updateError
            setProfile(updatedProfile)
          } else {
            setProfile(existingProfile)
          }
        } else {
          // Create new profile
          const { data: newProfile, error } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                full_name: session.user.user_metadata?.full_name,
                handle: session.user.email?.split('@')[0] || '',
                email: session.user.email,
                confirmed: !!session.user.email_confirmed_at,
                title: 'Automation Builder',
                bio: '',
                current_focus: '',
                skills: {
                  languages: [],
                  frameworks: [],
                  platforms: [],
                  tools: []
                },
                projects: [],
                role: 'talent',
                visibility: 'private',
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
              }
            ])
            .select()
            .single()

          if (error) throw error
          setProfile(newProfile)
        }
      } catch (error) {
        console.error('Error setting up profile:', error)
        router.push('/auth/signin')
      } finally {
        setLoading(false)
      }
    }

    setupProfile()
  }, [router])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          last_updated: new Date().toISOString()
        })
        .eq('id', profile.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      setEditing(null)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-slate flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-[#0F172A]">
        <DashboardNavbar />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 py-10 px-4 md:px-8 lg:px-12">
          {/* Sidebar: 1/5 (20%) */}
          <div className="lg:col-span-1 flex justify-center">
            <Sidebar />
          </div>
          {/* Main Content: 4/5 (80%) */}
          <main className="lg:col-span-4 flex flex-col gap-6">
            <ProfileHeader />
            <section className="space-y-6">
              {/* Bio Card */}
              <Card>
                <h2 className="text-lg font-semibold text-white mb-2">About</h2>
                <p className="text-slate-300">Short editable summary paragraph, motivation, mission.</p>
              </Card>
              {/* Skills Card */}
              <Card>
                <h2 className="text-lg font-semibold text-white mb-2">Skills & Tools</h2>
                <p className="text-slate-300">Grouped tag input with proficiency.</p>
              </Card>
              {/* Projects Card */}
              <Card>
                <h2 className="text-lg font-semibold text-white mb-2">Projects</h2>
                <p className="text-slate-300">Cards with title, impact, tech tags.</p>
              </Card>
              {/* Experience Card */}
              <Card>
                <h2 className="text-lg font-semibold text-white mb-2">Experience</h2>
                <p className="text-slate-300">Timeline UI or editable experience.</p>
              </Card>
              {/* Uploads Card */}
              <Card>
                <h2 className="text-lg font-semibold text-white mb-2">Uploads</h2>
                <p className="text-slate-300">Upload resume, files, demos.</p>
              </Card>
              {/* Scouting Stats Card */}
              <Card>
                <h2 className="text-lg font-semibold text-white mb-2">Scouting Stats</h2>
                <p className="text-slate-300">Charts (projects, endorsements, etc.).</p>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </AuthCheck>
  )
} 