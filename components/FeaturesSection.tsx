import { AcademicCapIcon, UserGroupIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: <AcademicCapIcon className="w-10 h-10 text-indigo-400" />,
    title: 'Showcase Real Work',
    desc: 'Player cards highlight actual projects, not just resumes.'
  },
  {
    icon: <UserGroupIcon className="w-10 h-10 text-indigo-400" />,
    title: 'Get Scouted',
    desc: 'Companies draft talent based on skills and outcomes.'
  },
  {
    icon: <ShieldCheckIcon className="w-10 h-10 text-indigo-400" />,
    title: 'Trust & Transparency',
    desc: 'Verified profiles and project results build trust.'
  },
  {
    icon: <BoltIcon className="w-10 h-10 text-indigo-400" />,
    title: 'Fast, AI-Powered Discovery',
    desc: 'Find the right builder in seconds with AI search.'
  },
]

export default function FeaturesSection() {
  return (
    <section id="how-it-works" className="w-full bg-[#1E293B] py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
        {/* Icons/Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-700 border-2 border-indigo-500 rounded-2xl shadow-2xl p-6 flex flex-col items-start">
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
              <p className="text-[#94A3B8]">{f.desc}</p>
            </div>
          ))}
        </div>
        {/* Graphic/Illustration Placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-6xl text-white font-bold shadow-lg">
            <span>🤖</span>
          </div>
        </div>
      </div>
    </section>
  )
} 