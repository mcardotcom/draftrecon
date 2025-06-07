import React from 'react'
import Card from './Card'
import { TalentProfile } from '@/lib/types'

interface ScoutingStatsCardProps {
  profile: TalentProfile
}

export default function ScoutingStatsCard({ profile }: ScoutingStatsCardProps) {
  // Placeholder: update to use real stats when available
  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-2">Scouting Stats</h2>
      <p className="text-slate-300">No stats yet.</p>
    </Card>
  )
} 