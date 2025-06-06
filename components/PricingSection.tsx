const plans = [
  {
    name: 'Talent',
    price: '$79',
    desc: 'Lifetime access for builders. Showcase your work and get scouted—one-time payment, no recurring fees.',
    cta: 'Join as Talent',
    href: '/signup',
    subtext: 'Lifetime access',
  },
  {
    name: 'Recruiter',
    price: '$25/mo',
    desc: 'Scout and contact top automation talent. Cancel anytime.',
    cta: 'Start Recruiting',
    href: '/signup',
    subtext: 'Or $240/year (20% off)',
  },
]

export default function PricingSection() {
  return (
    <section className="w-full bg-[#1E293B] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Access & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((p, i) => (
            <div key={i} className="bg-slate-700 border-2 border-indigo-500 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <div className="text-3xl font-bold text-indigo-400 mb-2">{p.price}</div>
              <p className="text-[#94A3B8] mb-2">{p.desc}</p>
              <div className="text-sm text-indigo-300 mb-6">{p.subtext}</div>
              <a href={p.href} className="px-6 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg">{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 