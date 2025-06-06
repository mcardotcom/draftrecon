import React from 'react'
import { UserCircle2, Github, Linkedin, Twitter } from 'lucide-react'

const quickStats = [
  { label: 'Projects', value: 12 },
  { label: 'Endorsements', value: 8 },
  { label: 'Experience', value: '5 yrs' }
]

const socialLinks = [
  { icon: Github, url: '#' },
  { icon: Linkedin, url: '#' },
  { icon: Twitter, url: '#' }
]

const navPills = [
  { label: 'Profile', href: '#profile' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Uploads', href: '#uploads' },
  { label: 'Stats', href: '#stats' }
]

export default function Sidebar() {
  return (
    <aside className="lg:sticky top-6 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800 p-6 w-full lg:w-72 min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-2">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-60 animate-pulse" />
          <span className="relative block w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500">
            <UserCircle2 className="w-full h-full text-indigo-400 bg-slate-900" />
          </span>
        </div>
        <h2 className="text-lg font-bold text-white">Builder Name</h2>
        <span className="bg-slate-700 text-indigo-400 px-2 py-0.5 rounded-full text-xs font-mono mt-1">@handle</span>
      </div>
      <div className="flex gap-4 justify-center mb-4">
        {socialLinks.map(({ icon: Icon, url }, idx) => (
          <a key={idx} href={url} className="hover:text-indigo-400 text-slate-400 dark:invert">
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <div className="flex gap-4 text-sm text-slate-400 justify-center mb-6">
        {quickStats.map(stat => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-white font-medium">{stat.value}</span>
            <span className="text-xs text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>
      <nav className="flex flex-col gap-2 w-full">
        {navPills.map(pill => (
          <a key={pill.label} href={pill.href} className="py-2 px-4 rounded-full hover:bg-slate-800 text-center transition text-slate-300 hover:text-white">
            {pill.label}
          </a>
        ))}
      </nav>
    </aside>
  )
} 