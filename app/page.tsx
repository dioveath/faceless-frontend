import Navbar from './components/landing/navbar'
import Hero from './components/landing/hero'
import Features from './components/landing/features'
import Cta from './components/landing/cta'
import Background from './components/landing/background'
import FloatingCursor from './components/landing/floating-cursor'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <Background />
      <FloatingCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Cta />
      </main>
    </div>
  )
}

