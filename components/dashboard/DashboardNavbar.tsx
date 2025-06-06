import React from 'react'
import Image from 'next/image'

export default function DashboardNavbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-6 lg:px-12 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-sm sticky top-0 z-30">
      {/* Logo (left) */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image src="/draftrecon logo.png" alt="DraftRecon Logo" width={140} height={140} className="rounded-full" />
      </div>
      {/* Search bar (right) */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search…"
          className="w-72 px-4 py-2 rounded-full bg-slate-800 text-slate-200 placeholder-slate-400 border border-slate-700 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
    </nav>
  )
} 