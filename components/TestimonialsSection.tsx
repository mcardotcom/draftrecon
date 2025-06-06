const testimonials = [
  {
    name: 'Jordan T.',
    role: 'Automation Pro',
    quote: 'DraftRecon helped me get noticed for my real work, not just my resume. Landed my dream gig!'
  },
  {
    name: 'Samantha R.',
    role: 'Recruiter',
    quote: 'The player card system is a game changer. I found top talent in days, not weeks.'
  },
  {
    name: 'Chris L.',
    role: 'Builder',
    quote: 'The AI-powered search made it easy for companies to find my best projects.'
  },
  {
    name: 'Morgan S.',
    role: 'Recruiter',
    quote: "DraftRecon's transparency and trust signals made hiring a breeze."
  },
]

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#1E293B] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-700 border-2 border-indigo-500 rounded-2xl shadow-2xl p-6 flex flex-col items-start">
              <p className="text-[#94A3B8] mb-4">“{t.quote}”</p>
              <div className="mt-auto">
                <span className="font-bold text-white">{t.name}</span>
                <span className="ml-2 text-sm text-indigo-400">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 