import { supabase } from './supabase'
import { Profile } from './supabase'
import { handleError, handleSuccess } from './toast'

export type UserRole = 'talent' | 'recruiter' | 'admin'

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    if (!user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError
    return profile
  } catch (error) {
    handleError(error)
    return null
  }
}

export async function getUserRole(): Promise<UserRole | null> {
  try {
    const profile = await getCurrentUser()
    return profile?.role || null
  } catch (error) {
    handleError(error)
    return null
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const role = await getUserRole()
    return role === 'admin'
  } catch (error) {
    handleError(error)
    return false
  }
}

export async function requireAuth() {
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

export async function requireRole(role: UserRole) {
  try {
    const userRole = await getUserRole()
    if (userRole !== role) {
      throw new Error(`Role ${role} required`)
    }
  } catch (error) {
    handleError(error)
    throw error
  }
}

export async function updateProfile(profile: Partial<Profile>) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
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