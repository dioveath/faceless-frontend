import Navbar from './components/landing/navbar'
import Hero from './components/landing/hero'
import Features from './components/landing/features'
import Cta from './components/landing/cta'
import Background from './components/landing/background'
import FloatingCursor from './components/landing/floating-cursor'
import Pricing from './components/landing/pricing'
import Testimonials from './components/landing/testimonials'
import Showcase from './components/landing/showcase'
import FAQ from './components/landing/faq'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <Background />
      <FloatingCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Showcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Cta />
      </main>
    </div>
  )
}

