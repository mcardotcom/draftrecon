// Types for our database tables
export type TalentProfile = {
  user_id: string
  created_at: string
  name: string | null
  username: string | null
  avatar_url: string | null
  headline: string | null
  bio: string | null
  location: string | null
  website: string | null
  email: string | null
  twitter: string | null
  github: string | null
  linkedin: string | null
  youtube: string | null
  loom: string | null
  primary_role: string | null
  current_company: string | null
  industry: string | null
  employment_type: string | null
  is_open_to_opportunities: boolean
  skills: string[] | null
  tools: string[] | null
  specialties: string[] | null
  years_of_experience: number | null
  portfolio_url: string | null
  resume_url: string | null
  is_visible: boolean
}

export type HireProfile = {
  user_id: string
  created_at: string
  name: string | null
  avatar_url: string | null
  headline: string | null
  bio: string | null
  email: string | null
  website: string | null
  linkedin: string | null
  twitter: string | null
  company_name: string | null
  company_size: string | null
  role_title: string | null
  job_type: string | null
  job_location: string | null
  is_hiring: boolean
  can_shortlist: boolean
  notes: string | null
}

export type HireProfileMember = {
  id: string
  hire_profile_id: string
  user_id: string
  role: 'owner' | 'editor' | 'viewer'
  invited_at: string
  accepted: boolean
}

export type Shortlist = {
  id: string
  hire_profile_id: string
  talent_profile_id: string
  tags: string[] | null
  rating: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type ShortlistActivity = {
  id: string
  shortlist_id: string
  actor_id: string
  action_type: 'added' | 'removed' | 'updated_rating' | 'added_tag' | 'removed_tag' | 'added_note'
  action_detail: string | null
  created_at: string
}

// Dashboard component types
export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'expert'
  category: 'language' | 'framework' | 'tool' | 'platform'
}

export interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  stack: string[]
  impact: string
  link?: string
}

export interface Attribute {
  name: string
  score: number
  description: string
}

export interface Endorsement {
  id: string
  text: string
  author: string
  role: string
  company: string
  emoji: string
}

export interface BuilderStats {
  projects: number
  endorsements: number
  experience: number
} 