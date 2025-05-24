import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import FeaturedEvents from '@/components/FeaturedEvents'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-100">
      <Navigation />
      <HeroSection />
      <FeaturedEvents />
    </main>
  )
}
