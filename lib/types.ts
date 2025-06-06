// Types for our database tables
export type Profile = {
  id: string
  full_name: string
  title?: string
  bio: string
  skills: string[]
  tools: string[]
  projects: {
    title: string
    description: string
    url: string
  }[]
  avatar_url?: string
  role: 'talent' | 'recruiter' | 'admin'
  created_at: string
}

export type Company = {
  id: string
  company_name: string
  description: string
  website: string
  subscription_status: 'free' | 'premium'
  created_at: string
}

export type Shortlist = {
  id: string
  recruiter_id: string
  player_id: string
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