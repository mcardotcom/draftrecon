import React, { useState } from 'react'
import Card from './Card'
import { TalentProfile } from '@/lib/types'

interface ExperienceCardProps {
  profile: TalentProfile
  onUpdate: (updates: Partial<TalentProfile>) => Promise<void>
}

export default function ExperienceCard({ profile, onUpdate }: ExperienceCardProps) {
  const [years, setYears] = useState(profile.years_of_experience ?? 0)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onUpdate({ years_of_experience: years })
    setSaving(false)
    setEditing(false)
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-2">Experience</h2>
      {editing ? (
        <div>
          <input
            className="input"
            type="number"
            min={0}
            value={years}
            onChange={e => setYears(Number(e.target.value))}
          />
          <button className="btn-primary mt-2" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-slate-300">
            {profile.years_of_experience ? `${profile.years_of_experience} years` : 'No experience info yet.'}
          </p>
          <button className="btn-secondary mt-2" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </Card>
  )
} 