import { Skill } from '@/lib/types'

interface SkillsToolsSectionProps {
  skills: Skill[]
}

const levelColors = {
  beginner: 'bg-blue-500/10 text-blue-400',
  intermediate: 'bg-purple-500/10 text-purple-400',
  expert: 'bg-signal-green/10 text-signal-green'
}

const categoryLabels = {
  language: 'Languages',
  framework: 'Frameworks',
  tool: 'Tools',
  platform: 'Platforms'
}

export default function SkillsToolsSection({ skills }: SkillsToolsSectionProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="bg-slate-800 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Skills & Tools</h2>
      
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-slate-400 mb-3">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <div
                  key={skill.name}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[skill.level]}`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 