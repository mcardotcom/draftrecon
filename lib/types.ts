// Types for our database tables
export type Profile = {
  id: string
  full_name: string
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