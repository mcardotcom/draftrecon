import { Attribute, Endorsement } from '@/lib/types'

interface ScoutingReportProps {
  attributes: Attribute[]
  endorsements: Endorsement[]
}

export default function ScoutingReport({ attributes, endorsements }: ScoutingReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-signal-green'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-slate-800 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Scouting Report</h2>
      
      {/* Attributes */}
      <div className="space-y-4 mb-8">
        {attributes.map((attr) => (
          <div key={attr.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400">{attr.name}</span>
              <span className={`font-semibold ${getScoreColor(attr.score)}`}>
                {attr.score}/10
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  attr.score >= 8
                    ? 'bg-signal-green'
                    : attr.score >= 6
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}
                style={{ width: `${(attr.score / 10) * 100}%` }}
              />
            </div>
            <p className="text-sm text-slate-400 mt-1">{attr.description}</p>
          </div>
        ))}
      </div>

      {/* Endorsements */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Endorsements</h3>
        <div className="space-y-4">
          {endorsements.map((endorsement) => (
            <div key={endorsement.id} className="bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{endorsement.emoji}</span>
                <div>
                  <p className="text-white mb-2">{endorsement.text}</p>
                  <div className="text-sm text-slate-400">
                    <span className="font-medium">{endorsement.author}</span>
                    <span className="mx-1">·</span>
                    <span>{endorsement.role}</span>
                    <span className="mx-1">·</span>
                    <span>{endorsement.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 