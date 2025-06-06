"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import PricingSection from '@/components/landing/PricingSection'
import Footer from '@/components/landing/Footer'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: "Alex Adams",
    quote: "My win rate has increased dramatically. The AI-driven system is unmatched!",
    avatar: "A",
  },
  {
    name: "William D.",
    quote: "I was skeptical at first, but the AI-driven picks have been a game changer.",
    avatar: "W",
  },
  {
    name: "Paul Smith",
    quote: "Betting used to be frustrating, now it's fun and profitable!",
    avatar: "P",
  },
]

const packages = [
  {
    name: "Daily Package",
    desc: "Daily Card",
    price: "$199",
    cta: "Get Picks",
  },
  {
    name: "Session Packages",
    desc: "Baseball 2024",
    price: "$749",
    cta: "Get Picks",
  },
  {
    name: "Max Bet Package",
    desc: "Baseball 2024",
    price: "$995",
    cta: "Get Picks",
  },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-[#1E293B] min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  )
} 