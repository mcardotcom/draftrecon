import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  return (
    <section className="w-full bg-[#1E293B] py-24 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Discover & Draft Top Automation Talent</h1>
        <p className="text-lg md:text-2xl text-[#94A3B8] mb-10">A high-signal, low-noise scouting platform where AI-assisted builders and automation pros showcase their work on player cards.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={() => router.push('/cards')} className="px-8 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg text-lg">Scout Talent</button>
          <button onClick={() => router.push('/signup')} className="px-8 py-3 rounded-2xl bg-slate-800 hover:bg-indigo-600 text-white font-semibold shadow-lg text-lg">Join Early Access</button>
        </div>
      </div>
    </section>
  )
} 