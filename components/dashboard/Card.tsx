import React from 'react'
import clsx from 'clsx'

export default function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-md hover:shadow-lg transition-all backdrop-blur-sm/10 hover:bg-slate-800/90',
        'hover:ring-2 hover:ring-indigo-500/40',
        className
      )}
      style={{
        boxShadow: '0 4px 32px 0 rgba(99,102,241,0.08)',
        background: 'rgba(30,41,59,0.85)',
      }}
    >
      {children}
    </div>
  )
} 