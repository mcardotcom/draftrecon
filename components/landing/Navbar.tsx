import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full bg-midnight-slate text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image src="/draftrecon logo.png" alt="DraftRecon Logo" width={140} height={140} className="rounded-full" />
        </Link>
        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-steel-text">
          <Link href="/cards" className="hover:text-white transition">Scout Talent</Link>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/auth/signin')}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Sign In
          </button>
          <button 
            onClick={() => router.push('/auth/signup')}
            className="px-6 py-2 rounded-xl bg-signal-indigo hover:bg-signal-indigo/90 text-white font-medium transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
} 