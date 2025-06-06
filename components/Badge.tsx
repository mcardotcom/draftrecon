import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'skill' | 'tool'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium'
  
  const variantStyles = {
    default: 'bg-cloud-gray text-midnight-slate',
    skill: 'bg-signal-indigo bg-opacity-10 text-signal-indigo',
    tool: 'bg-signal-green bg-opacity-10 text-signal-green'
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
} 