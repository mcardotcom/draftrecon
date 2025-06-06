import { ReactNode } from 'react'
import Link from 'next/link'

interface SidebarItem {
  label: string
  href: string
  icon?: ReactNode
  active?: boolean
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
}

export default function Sidebar({ items, className = '' }: SidebarProps) {
  return (
    <aside className={`w-64 bg-midnight-slate text-white p-4 ${className}`}>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center px-3 py-2 rounded-lg text-sm font-medium
              ${item.active 
                ? 'bg-signal-indigo text-white' 
                : 'text-steel-text hover:bg-signal-indigo/10 hover:text-white'
              }
            `}
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 