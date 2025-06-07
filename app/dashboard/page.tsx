"use client"

import AuthCheck from '@/components/AuthCheck'
import Sidebar from '@/components/dashboard/Sidebar'
import ProfileHeader from '@/components/dashboard/ProfileHeader'
import Card from '@/components/dashboard/Card'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import { useTalentProfile } from '@/lib/useProfile'
import AboutCard from '@/components/dashboard/AboutCard'
import SkillsCard from '@/components/dashboard/SkillsCard'
import ProjectsCard from '@/components/dashboard/ProjectsCard'
import ExperienceCard from '@/components/dashboard/ExperienceCard'
import UploadsCard from '@/components/dashboard/UploadsCard'
import ScoutingStatsCard from '@/components/dashboard/ScoutingStatsCard'

export default function DashboardPage() {
  const { profile, loading, error, updateProfile } = useTalentProfile()

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-slate flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-midnight-slate flex items-center justify-center">
        <div className="text-red-400 font-semibold">{error}</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-midnight-slate flex items-center justify-center">
        <div className="text-red-400 font-semibold">Profile not found.</div>
      </div>
    )
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-[#0F172A]">
        <DashboardNavbar />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 py-10 px-4 md:px-8 lg:px-12">
          {/* Sidebar: 1/5 (20%) */}
          <div className="lg:col-span-1 flex justify-center -ml-3">
            <Sidebar profile={profile} />
          </div>
          {/* Main Content: 4/5 (80%) */}
          <main className="lg:col-span-4 flex flex-col gap-6">
            <ProfileHeader profile={profile} />
            <section className="space-y-6">
              <AboutCard profile={profile} onUpdate={updateProfile} />
              <SkillsCard profile={profile} onUpdate={updateProfile} />
              <ProjectsCard profile={profile} />
              <ExperienceCard profile={profile} onUpdate={updateProfile} />
              <UploadsCard profile={profile} onUpdate={updateProfile} />
              <ScoutingStatsCard profile={profile} />
            </section>
          </main>
        </div>
      </div>
    </AuthCheck>
  )
} 