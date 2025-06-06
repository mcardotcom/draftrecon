import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabaseClient'
import { Profile } from './types'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const setupProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/auth/signin')
          return
        }
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (existingProfile) {
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
      } catch (err: any) {
        setError(err.message || 'Error setting up profile')
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
    } catch (err: any) {
      setError(err.message || 'Error updating profile')
    }
  }

  return { profile, loading, error, updateProfile }
} 