import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabaseClient'
import { TalentProfile } from './types'

export function useTalentProfile() {
  const [profile, setProfile] = useState<TalentProfile | null>(null)
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

        // Wait a short time to allow the trigger to complete
        await new Promise(resolve => setTimeout(resolve, 1000))

        const { data: existingProfile, error: profileError } = await supabase
          .from('talent_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw profileError
        }

        if (existingProfile) {
          setProfile(existingProfile)
        } else {
          // Only create profile if it doesn't exist and we have the required metadata
          if (!session.user.user_metadata?.name || !session.user.user_metadata?.username) {
            throw new Error('Missing required profile information')
          }

          const { data: newProfile, error: insertError } = await supabase
            .from('talent_profiles')
            .insert([
              {
                user_id: session.user.id,
                name: session.user.user_metadata.name,
                username: session.user.user_metadata.username,
                email: session.user.email,
                created_at: new Date().toISOString(),
                is_visible: true
              }
            ])
            .select()
            .single()

          if (insertError) {
            if (insertError.code === '23505') { // Unique violation
              throw new Error('Username already taken')
            }
            throw insertError
          }
          setProfile(newProfile)
        }
      } catch (err: any) {
        console.error('Profile setup error:', err)
        setError(err.message || 'Error setting up profile')
        router.push('/auth/signin')
      } finally {
        setLoading(false)
      }
    }
    setupProfile()
  }, [router])

  const updateProfile = async (updates: Partial<TalentProfile>) => {
    if (!profile) return
    try {
      const { data, error } = await supabase
        .from('talent_profiles')
        .update(updates)
        .eq('user_id', profile.user_id)
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