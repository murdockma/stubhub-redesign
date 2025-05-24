'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

const events = [
  {
    id: 1,
    title: 'Taylor Swift - The Eras Tour',
    date: 'June 15, 2024',
    venue: 'Madison Square Garden',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    price: 'From $299',
    category: 'Concerts',
  },
  {
    id: 2,
    title: 'NBA Finals Game 7',
    date: 'June 20, 2024',
    venue: 'Crypto.com Arena',
    image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=1200&q=80',
    price: 'From $499',
    category: 'Sports',
  },
  {
    id: 3,
    title: 'Hamilton',
    date: 'June 25, 2024',
    venue: 'Richard Rodgers Theatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 'From $199',
    category: 'Theater',
  },
]

// Add PPV Buys and Event Highlights data
const ppvEvents = [
  {
    id: 1,
    title: 'UFC 300: Jones vs. Miocic',
    date: 'July 20, 2024',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    price: '$79.99',
    description: 'Heavyweight Championship - Live PPV',
  },
  {
    id: 2,
    title: 'Canelo vs. Benavidez',
    date: 'August 10, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    price: '$59.99',
    description: 'World Middleweight Title - Live PPV',
  },
  {
    id: 3,
    title: 'Taylor Swift: The Eras Tour (PPV)',
    date: 'September 1, 2024',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    price: '$39.99',
    description: 'Live Concert Stream',
  },
]

// Add stats to highlights data
const highlights = [
  {
    id: 1,
    title: 'NBA Finals Game 7 Highlights',
    date: 'June 20, 2024',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    description: 'Watch the best moments from the thrilling Game 7!',
    stats: {
      score: '112-108',
      attendance: '18,000',
      mvp: 'Jayson Tatum',
    },
  },
  {
    id: 2,
    title: 'Hamilton Opening Night Recap',
    date: 'June 25, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: "Relive the magic of Hamilton's opening night.",
    stats: {
      soldOut: 'Yes',
      standingOvation: '3 Times',
      lead: 'Lin-Manuel Miranda',
    },
  },
  {
    id: 3,
    title: 'Taylor Swift Tour: Best Performances',
    date: 'May 20, 2024',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    description: "Highlights from Taylor Swift's record-breaking tour.",
    stats: {
      songs: '44',
      crowd: '70,000+',
      city: 'Los Angeles',
    },
  },
]

const FeaturedEvents = () => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0)

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const nextHighlight = () => {
    setCurrentHighlightIndex((prev) => (prev + 1) % highlights.length)
  }
  const prevHighlight = () => {
    setCurrentHighlightIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
  }

  const currentHighlight = highlights[currentHighlightIndex]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-gray-900">Featured Events</h2>
          <p className="mt-4 text-lg text-gray-600">Don't miss out on these upcoming events</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 group">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(event.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-200/80 transition-colors duration-200 shadow"
                >
                  {favorites.includes(event.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-accent-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-700" />
                  )}
                </motion.button>
                <AnimatePresence>
                  {hoveredEvent === event.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/90 to-transparent"
                    >
                      <span className="text-sm font-medium text-primary-500">{event.category}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-primary-600 font-semibold">{event.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow"
                  >
                    View Tickets
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PPV Buys Section - Header and Single Large Card with List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 mt-20"
        >
          <h2 className="font-display text-2xl font-bold text-gray-900">PPV Buys</h2>
          <p className="mt-2 text-md text-gray-600">Stream live events and exclusive pay-per-view experiences</p>
        </motion.div>
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-xl p-8"
          >
            <ul className="divide-y divide-gray-200">
              {ppvEvents.map((event) => (
                <li key={event.id} className="flex items-center py-4 gap-4">
                  <img src={event.image} alt={event.title} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold text-gray-900">{event.title}</span>
                      <span className="text-primary-600 font-semibold ml-0 sm:ml-4">{event.price}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1">
                      <span className="text-gray-600 text-sm">{event.date}</span>
                      <span className="text-gray-500 text-xs ml-0 sm:ml-4">{event.description}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow"
                  >
                    Buy Now
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Event Highlights Section - Single Large Card Carousel */}
        <div className="mt-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl font-bold text-gray-900">Event Highlights</h2>
            <p className="mt-2 text-md text-gray-600">Catch up on the best moments from recent and live events</p>
          </motion.div>
          <div className="relative w-full max-w-6xl">
            <motion.div
              key={currentHighlight.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full"
            >
              {/* Video Player */}
              <div className="relative w-full md:w-2/5 h-64 md:h-[28rem] group flex-shrink-0 flex items-center justify-center bg-black">
                <video
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  poster={currentHighlight.image}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
              {/* Highlight Info */}
              <div className="flex-1 p-8 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">{currentHighlight.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{currentHighlight.date}</p>
                  <p className="text-gray-700 text-base mb-4">{currentHighlight.description}</p>
                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {currentHighlight.stats && Object.entries(currentHighlight.stats).map(([key, value]) => (
                      <div key={key} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-xs font-semibold">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Carousel Controls */}
            <button
              onClick={prevHighlight}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-primary-50 transition z-10"
              aria-label="Previous Highlight"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={nextHighlight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-primary-50 transition z-10"
              aria-label="Next Highlight"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {highlights.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHighlightIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentHighlightIndex ? 'bg-primary-500 w-4' : 'bg-gray-300'}`}
                  aria-label={`Go to highlight ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedEvents 