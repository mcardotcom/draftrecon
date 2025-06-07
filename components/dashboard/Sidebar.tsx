import React from 'react'
import { UserCircle2, Github, Linkedin, Twitter } from 'lucide-react'
import { TalentProfile } from '@/lib/types'

interface SidebarProps {
  profile: TalentProfile
}

const quickStats = [
  { label: 'Projects', value: 12 },
  { label: 'Endorsements', value: 8 },
  { label: 'Experience', value: '5 yrs' }
]

const navPills = [
  { label: 'Profile', href: '#profile' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Uploads', href: '#uploads' },
  { label: 'Stats', href: '#stats' }
]

export default function Sidebar({ profile }: SidebarProps) {
  const socialLinks = [
    { icon: Github, url: profile.github ? `https://github.com/${profile.github}` : '#' },
    { icon: Linkedin, url: profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : '#' },
    { icon: Twitter, url: profile.twitter ? `https://twitter.com/${profile.twitter}` : '#' }
  ]

  return (
    <aside className="lg:sticky top-6 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800 p-6 w-full lg:w-72 min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-2">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-60 animate-pulse" />
          <span className="relative block w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserCircle2 className="w-full h-full text-indigo-400 bg-slate-900" />
            )}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white">{profile.name || 'Builder Name'}</h2>
        <span className="bg-slate-700 text-indigo-400 px-2 py-0.5 rounded-full text-xs font-mono mt-1">@{profile.username || 'handle'}</span>
      </div>
      <div className="flex gap-4 justify-center mb-4">
        {socialLinks.map(({ icon: Icon, url }, idx) => (
          <a key={idx} href={url} className="hover:text-indigo-400 text-slate-400 dark:invert" target="_blank" rel="noopener noreferrer">
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <div className="flex gap-4 text-sm text-slate-400 justify-center mb-6">
        <div className="flex flex-col items-center">
          <span className="text-white font-medium">{profile.skills?.length ?? 0}</span>
          <span className="text-xs text-slate-400">Skills</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-medium">{profile.years_of_experience ?? 0}</span>
          <span className="text-xs text-slate-400">Years</span>
        </div>
      </div>
      <nav className="flex flex-col gap-2 w-full">
        <a href="#profile" className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">Profile</a>
        <a href="#skills" className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">Skills</a>
        <a href="#projects" className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">Projects</a>
        <a href="#experience" className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">Experience</a>
        <a href="#uploads" className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">Uploads</a>
        <a href="#stats" className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">Stats</a>
      </nav>
    </aside>
  )
} 