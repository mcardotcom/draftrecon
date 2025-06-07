import React from 'react'
import Card from './Card'
import { TalentProfile } from '@/lib/types'

interface ProjectsCardProps {
  profile: TalentProfile
}

export default function ProjectsCard({ profile }: ProjectsCardProps) {
  // Placeholder: update to use real project data when available
  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-2">Projects</h2>
      <p className="text-slate-300">No projects yet.</p>
    </Card>
  )
} 