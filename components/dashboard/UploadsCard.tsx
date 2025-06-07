import React, { useState } from 'react'
import Card from './Card'
import { TalentProfile } from '@/lib/types'

interface UploadsCardProps {
  profile: TalentProfile
  onUpdate: (updates: Partial<TalentProfile>) => Promise<void>
}

export default function UploadsCard({ profile, onUpdate }: UploadsCardProps) {
  const [resumeUrl, setResumeUrl] = useState(profile.resume_url || '')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onUpdate({ resume_url: resumeUrl })
    setSaving(false)
    setEditing(false)
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-2">Uploads</h2>
      {editing ? (
        <div>
          <input
            className="input"
            type="url"
            placeholder="Resume URL"
            value={resumeUrl}
            onChange={e => setResumeUrl(e.target.value)}
          />
          <button className="btn-primary mt-2" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-slate-300">
            {profile.resume_url ? (
              <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="underline text-signal-green">
                View Resume
              </a>
            ) : (
              'No resume uploaded yet.'
            )}
          </p>
          <button className="btn-secondary mt-2" onClick={() => setEditing(true)}>
            {profile.resume_url ? 'Update Resume' : 'Upload Resume'}
          </button>
        </div>
      )}
    </Card>
  )
} 