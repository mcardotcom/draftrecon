import Image from 'next/image'
import { Profile, BuilderStats } from '@/lib/types'

interface BuilderHeaderProps {
  profile: Profile
  stats: BuilderStats
}

export default function BuilderHeader({ profile, stats }: BuilderHeaderProps) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-signal-indigo to-signal-green" />
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden bg-slate-700">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-white">
                {profile.full_name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Name and Tagline */}
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">{profile.full_name}</h1>
            <p className="text-slate-400 mt-1">{profile.title || 'Automation Builder'}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-signal-green">{stats.projects}</p>
            <p className="text-sm text-slate-400">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-signal-green">{stats.endorsements}</p>
            <p className="text-sm text-slate-400">Endorsements</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-signal-green">{stats.experience}y</p>
            <p className="text-sm text-slate-400">Experience</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full md:w-auto px-6 py-3 bg-signal-indigo hover:bg-signal-indigo/90 text-white font-medium rounded-xl transition">
          Scout This Builder
        </button>
      </div>
    </div>
  )
} 