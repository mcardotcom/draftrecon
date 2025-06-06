"use client"

import AuthCheck from '@/components/AuthCheck'

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-midnight-slate">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </AuthCheck>
  )
} 