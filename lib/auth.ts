import { supabase } from './supabaseClient'
import { TalentProfile } from './types'
import { handleError, handleSuccess } from './toast'

export async function getCurrentTalentProfile(): Promise<TalentProfile | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    if (!user) return null

    const { data: profile, error: profileError } = await supabase
      .from('talent_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError) throw profileError
    return profile
  } catch (error) {
    handleError(error)
    return null
  }
}

export async function requireTalentAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    if (!session) {
      throw new Error('Authentication required')
    }
    return session
  } catch (error) {
    handleError(error)
    throw error
  }
}

export async function updateTalentProfile(profile: Partial<TalentProfile>) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('talent_profiles')
      .update(profile)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    handleSuccess('Profile updated successfully')
    return data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    handleSuccess('Signed out successfully')
  } catch (error) {
    handleError(error)
    throw error
  }
} 