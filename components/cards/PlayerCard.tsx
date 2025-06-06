import React from 'react'
import { Profile } from '@/lib/types'
import Image from 'next/image'
import Badge from '@/components/cards/Badge'
import CTAButton from '@/components/ui/CTAButton'
import { usePlayerCard } from '@/lib/hooks/usePlayerCard'

interface PlayerCardProps {
  profile: Profile
  onShortlist?: () => void
  isShortlisted?: boolean
}

export default function PlayerCard({ profile, onShortlist, isShortlisted: initialIsShortlisted }: PlayerCardProps) {
  const { isShortlisted, toggleShortlist } = usePlayerCard(initialIsShortlisted);

  return (
    <div className="card hover:shadow-lg transition-shadow bg-white rounded-2xl p-6">
      <div className="flex items-start gap-4">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name}
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 bg-signal-indigo bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-signal-indigo">
              {profile.full_name.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{profile.full_name}</h3>
          <p className="text-steel-text mb-4">{profile.bio}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.languages.map((skill: string) => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
            {profile.skills.frameworks.map((skill: string) => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
            {profile.skills.platforms.map((skill: string) => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.tools.map((tool: string) => (
              <Badge key={tool} variant="tool">
                {tool}
              </Badge>
            ))}
          </div>
          
          {profile.projects.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Projects</h4>
              {profile.projects.map((project: { title: string; url: string }) => (
                <a
                  key={project.url}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-signal-indigo hover:underline"
                >
                  {project.title}
                </a>
              ))}
            </div>
          )}
          
          {onShortlist && (
            <CTAButton
              onClick={toggleShortlist}
              variant={isShortlisted ? 'secondary' : 'primary'}
              className="mt-4"
            >
              {isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
} 