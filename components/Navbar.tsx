import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1E293B] text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image src="/draftrecon logo.png" alt="DraftRecon Logo" width={140} height={140} className="rounded-full" />
        </Link>
        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-300">
          <Link href="/cards" className="hover:text-indigo-400 transition">Scout Talent</Link>
          <a href="#how-it-works" className="hover:text-indigo-400 transition">How It Works</a>
          <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/auth" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 transition">Login</Link>
          <Link href="/signup" className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
} 