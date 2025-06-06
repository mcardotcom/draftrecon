import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E293B] py-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Image src="/draftrecon logo.png" alt="DraftRecon Logo" width={140} height={140} className="rounded-full" />
        </div>
        <div className="flex gap-6 text-[#94A3B8]">
          <Link href="#contact" className="hover:text-indigo-400 transition">Contact</Link>
          <Link href="mailto:hello@draftrecon.com" className="hover:text-indigo-400 transition">Email</Link>
          <Link href="/privacy" className="hover:text-indigo-400 transition">Privacy</Link>
        </div>
      </div>
    </footer>
  )
} 