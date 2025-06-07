import React, { useState } from 'react'
import Card from './Card'
import { TalentProfile } from '@/lib/types'

interface AboutCardProps {
  profile: TalentProfile
  onUpdate: (updates: Partial<TalentProfile>) => Promise<void>
}

export default function AboutCard({ profile, onUpdate }: AboutCardProps) {
  const [bio, setBio] = useState(profile.bio || '')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onUpdate({ bio })
    setSaving(false)
    setEditing(false)
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-2">About</h2>
      {editing ? (
        <div>
          <textarea
            className="w-full p-2 rounded bg-slate-800 text-white"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
          />
          <button className="btn-primary mt-2" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-slate-300">{profile.bio || 'No bio yet.'}</p>
          <button className="btn-secondary mt-2" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </Card>
  )
} 