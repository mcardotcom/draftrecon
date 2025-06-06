import { Profile } from '@/lib/supabase'
import PlayerCard from '@/components/cards/PlayerCard'

interface CardGalleryProps {
  profiles: Profile[]
  onShortlist?: (profileId: string) => void
  shortlistedIds?: string[]
  className?: string
}

export default function CardGallery({
  profiles,
  onShortlist,
  shortlistedIds = [],
  className = ''
}: CardGalleryProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {profiles.map((profile) => (
        <PlayerCard
          key={profile.id}
          profile={profile}
          onShortlist={onShortlist ? () => onShortlist(profile.id) : undefined}
          isShortlisted={shortlistedIds.includes(profile.id)}
        />
      ))}
      
      {profiles.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-steel-text text-lg">
            No profiles found matching your criteria.
          </p>
        </div>
      )}
    </div>
  )
} 