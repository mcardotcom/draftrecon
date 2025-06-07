import React from 'react'
import Card from './Card'
import { Pen, Link2, Eye, Lock } from 'lucide-react'
import { TalentProfile } from '@/lib/types'

interface ProfileHeaderProps {
  profile: TalentProfile
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const isPublic = profile.is_visible
  return (
    <Card className="flex items-center gap-6 bg-slate-800/70 backdrop-blur-md border border-slate-700 shadow-lg p-6 relative">
      {/* Avatar + Status */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-60 animate-pulse" />
        <img
          src={profile.avatar_url || '/avatar.jpg'}
          alt="Avatar"
          className="w-16 h-16 rounded-full ring-4 ring-indigo-500 shadow-md object-cover relative z-10"
        />
        <span className={`absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full font-semibold ${isPublic ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-200'}`}
        >
          {isPublic ? 'Public' : 'Private'}
        </span>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-semibold text-white">{profile.name || 'Builder Name'}</h1>
        <p className="text-indigo-400 text-sm">{profile.headline || 'Automation Builder & Workflow Specialist'}</p>
        <span className="text-xs text-slate-400">@{profile.username || 'handle'}</span>
      </div>
      {/* Actions */}
      <div className="ml-auto flex items-center gap-4">
        <button className="text-slate-300 hover:text-white flex items-center gap-1 transition-all"><Pen className="w-4 h-4" /> Edit</button>
        <button className="text-slate-300 hover:text-white flex items-center gap-1 transition-all"><Link2 className="w-4 h-4" /> Copy</button>
        <button className="text-slate-300 hover:text-white flex items-center gap-1 transition-all">
          {isPublic ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isPublic ? 'Public' : 'Private'}
        </button>
      </div>
    </Card>
  )
} 