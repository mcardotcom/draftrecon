"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AuthCheck from '@/components/AuthCheck'
import { Profile, Skill, Project, Attribute, Endorsement, BuilderStats } from '@/lib/types'
import BuilderHeader from '@/components/dashboard/BuilderHeader'
import SkillsToolsSection from '@/components/dashboard/SkillsToolsSection'
import ProjectsGrid from '@/components/dashboard/ProjectsGrid'
import ScoutingReport from '@/components/dashboard/ScoutingReport'

// Sample data - replace with real data from your database
const sampleSkills: Skill[] = [
  { name: 'Python', level: 'expert', category: 'language' },
  { name: 'JavaScript', level: 'expert', category: 'language' },
  { name: 'React', level: 'expert', category: 'framework' },
  { name: 'Node.js', level: 'expert', category: 'framework' },
  { name: 'Supabase', level: 'intermediate', category: 'platform' },
  { name: 'AWS', level: 'intermediate', category: 'platform' },
  { name: 'Git', level: 'expert', category: 'tool' },
  { name: 'Docker', level: 'intermediate', category: 'tool' }
]

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Automated Data Pipeline',
    description: 'Built a real-time data processing pipeline that reduced processing time by 80%',
    imageUrl: '/project1.jpg',
    stack: ['Python', 'AWS', 'Docker'],
    impact: '80% faster processing',
    link: 'https://github.com/example/project1'
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Created an interactive dashboard with ML-powered insights',
    imageUrl: '/project2.jpg',
    stack: ['React', 'Node.js', 'TensorFlow'],
    impact: '50% more accurate predictions',
    link: 'https://github.com/example/project2'
  }
]

const sampleAttributes: Attribute[] = [
  {
    name: 'Technical Expertise',
    score: 9,
    description: 'Deep understanding of automation tools and best practices'
  },
  {
    name: 'Problem Solving',
    score: 8,
    description: 'Excellent at breaking down complex problems into manageable solutions'
  },
  {
    name: 'Communication',
    score: 7,
    description: 'Clear and effective communication with stakeholders'
  },
  {
    name: 'Innovation',
    score: 8,
    description: 'Consistently brings creative solutions to technical challenges'
  }
]

const sampleEndorsements: Endorsement[] = [
  {
    id: '1',
    text: "One of the most skilled automation builders I've worked with. Their solutions are always elegant and efficient.",
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp',
    emoji: '🚀'
  },
  {
    id: '2',
    text: 'Exceptional problem solver who consistently delivers high-quality solutions.',
    author: 'Michael Rodriguez',
    role: 'Engineering Lead',
    company: 'InnovateAI',
    emoji: '💡'
  }
]

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
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
          setProfile(existingProfile)
        } else {
          // Create new profile
          const { data: newProfile, error } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                full_name: session.user.email?.split('@')[0] || 'User',
                bio: '',
                skills: [],
                tools: [],
                projects: [],
                role: 'talent',
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

  const stats: BuilderStats = {
    projects: 12,
    endorsements: 8,
    experience: 5
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-midnight-slate">
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <BuilderHeader
            profile={profile}
            stats={stats}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">
              <SkillsToolsSection skills={sampleSkills} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              <ProjectsGrid projects={sampleProjects} />
              <ScoutingReport
                attributes={sampleAttributes}
                endorsements={sampleEndorsements}
              />
            </div>
          </div>
        </main>
      </div>
    </AuthCheck>
  )
} 