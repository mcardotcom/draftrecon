import React, { useState } from 'react'
import Card from './Card'
import { TalentProfile } from '@/lib/types'

interface SkillsCardProps {
  profile: TalentProfile
  onUpdate: (updates: Partial<TalentProfile>) => Promise<void>
}

export default function SkillsCard({ profile, onUpdate }: SkillsCardProps) {
  const [skills, setSkills] = useState(profile.skills || [])
  const [tools, setTools] = useState(profile.tools || [])
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newTool, setNewTool] = useState('')

  const handleSave = async () => {
    setSaving(true)
    await onUpdate({ skills, tools })
    setSaving(false)
    setEditing(false)
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }

  const addTool = () => {
    if (newTool && !tools.includes(newTool)) {
      setTools([...tools, newTool])
      setNewTool('')
    }
  }

  const removeSkill = (skill: string) => setSkills(skills.filter(s => s !== skill))
  const removeTool = (tool: string) => setTools(tools.filter(t => t !== tool))

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-2">Skills & Tools</h2>
      {editing ? (
        <div>
          <div className="mb-2">
            <label className="block text-slate-400 mb-1">Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map(skill => (
                <span key={skill} className="bg-indigo-700 text-white px-2 py-1 rounded flex items-center">
                  {skill}
                  <button className="ml-1 text-xs" onClick={() => removeSkill(skill)}>✕</button>
                </span>
              ))}
            </div>
            <input
              className="input"
              type="text"
              placeholder="Add skill"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill()}
            />
            <button className="btn-secondary ml-2" onClick={addSkill}>Add</button>
          </div>
          <div className="mb-2">
            <label className="block text-slate-400 mb-1">Tools</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tools.map(tool => (
                <span key={tool} className="bg-slate-700 text-white px-2 py-1 rounded flex items-center">
                  {tool}
                  <button className="ml-1 text-xs" onClick={() => removeTool(tool)}>✕</button>
                </span>
              ))}
            </div>
            <input
              className="input"
              type="text"
              placeholder="Add tool"
              value={newTool}
              onChange={e => setNewTool(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTool()}
            />
            <button className="btn-secondary ml-2" onClick={addTool}>Add</button>
          </div>
          <button className="btn-primary mt-2" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {(profile.skills || []).map(skill => (
              <span key={skill} className="bg-indigo-700 text-white px-2 py-1 rounded">{skill}</span>
            ))}
            {(profile.tools || []).map(tool => (
              <span key={tool} className="bg-slate-700 text-white px-2 py-1 rounded">{tool}</span>
            ))}
          </div>
          <button className="btn-secondary mt-2" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </Card>
  )
} 