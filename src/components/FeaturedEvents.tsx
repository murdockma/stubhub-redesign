'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, MapPinIcon, HeartIcon, TicketIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import TicketPurchaseModal from './TicketPurchaseModal'
import ViewTicketsModal from './ViewTicketsModal'

interface Event {
  id: number
  title: string
  date: string
  venue: string
  image: string
  price: string
  description: string
}

interface PPVEvent {
  id: number
  title: string
  date: string
  image: string
  price: string
  description: string
}

interface Highlight {
  id: number
  title: string
  date: string
  image: string
  description: string
  stats: {
    views: number
    likes: number
    comments: number
  }
}

const events: Event[] = [
  {
    id: 1,
    title: 'Taylor Swift - The Eras Tour',
    date: 'June 15, 2024',
    venue: 'Madison Square Garden',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    price: 'From $299',
    description: 'Concerts',
  },
  {
    id: 2,
    title: 'NBA Finals Game 7',
    date: 'June 20, 2024',
    venue: 'Crypto.com Arena',
    image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=1200&q=80',
    price: 'From $499',
    description: 'Sports',
  },
  {
    id: 3,
    title: 'Hamilton',
    date: 'June 25, 2024',
    venue: 'Richard Rodgers Theatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 'From $199',
    description: 'Theater',
  },
  {
    id: 4,
    title: "Drake - It's All A Blur Tour",
    date: 'July 1, 2024',
    venue: 'Staples Center',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
    price: 'From $249',
    description: 'Concerts',
  },
  {
    id: 5,
    title: 'Wimbledon Finals',
    date: 'July 14, 2024',
    venue: 'All England Club',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
    price: 'From $399',
    description: 'Sports',
  },
  {
    id: 6,
    title: 'The Lion King',
    date: 'July 20, 2024',
    venue: 'Minskoff Theatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    price: 'From $159',
    description: 'Theater',
  },
  {
    id: 7,
    title: 'Beyoncé - Renaissance Tour',
    date: 'August 5, 2024',
    venue: 'MetLife Stadium',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    price: 'From $279',
    description: 'Concerts',
  },
  {
    id: 8,
    title: 'US Open Finals',
    date: 'September 10, 2024',
    venue: 'Arthur Ashe Stadium',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
    price: 'From $349',
    description: 'Sports',
  },
  {
    id: 9,
    title: 'Wicked',
    date: 'September 15, 2024',
    venue: 'Gershwin Theatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    price: 'From $189',
    description: 'Theater',
  },
  {
    id: 10,
    title: 'Ed Sheeran - Mathematics Tour',
    date: 'October 1, 2024',
    venue: 'Mercedes-Benz Stadium',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
    price: 'From $229',
    description: 'Concerts',
  },
  {
    id: 11,
    title: 'World Series Game 7',
    date: 'October 30, 2024',
    venue: 'Yankee Stadium',
    image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=1200&q=80',
    price: 'From $599',
    description: 'Sports',
  },
  {
    id: 12,
    title: 'The Phantom of the Opera',
    date: 'November 5, 2024',
    venue: 'Majestic Theatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    price: 'From $169',
    description: 'Theater',
  },
]

const ppvEvents: PPVEvent[] = [
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

const highlights: Highlight[] = [
  {
    id: 1,
    title: 'NBA Finals Game 7 Highlights',
    date: 'June 20, 2024',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    description: 'Watch the best moments from the thrilling Game 7!',
    stats: {
      views: 100000,
      likes: 5000,
      comments: 1000,
    },
  },
  {
    id: 2,
    title: 'Hamilton Opening Night Recap',
    date: 'June 25, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: "Relive the magic of Hamilton's opening night.",
    stats: {
      views: 50000,
      likes: 2000,
      comments: 500,
    },
  },
  {
    id: 3,
    title: 'Taylor Swift Tour: Best Performances',
    date: 'May 20, 2024',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    description: "Highlights from Taylor Swift's record-breaking tour.",
    stats: {
      views: 75000,
      likes: 3000,
      comments: 750,
    },
  },
]

const FeaturedEvents = () => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<Event | PPVEvent | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isViewTicketsModalOpen, setIsViewTicketsModalOpen] = useState(false)
  const [isPPVPurchase, setIsPPVPurchase] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const eventsPerPage = 10
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const currentEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  )

  const firstRow = currentEvents.slice(0, 5)
  const secondRow = currentEvents.slice(5, 10)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

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

  const handleViewTickets = (event: Event) => {
    setSelectedEvent(event)
    setIsViewTicketsModalOpen(true)
  }

  const handleBuyPPV = (event: PPVEvent) => {
    setSelectedEvent(event)
    setIsPPVPurchase(true)
    setIsPurchaseModalOpen(true)
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
          <p className="mt-4 text-lg text-gray-600">Discover the hottest events in your area</p>
        </motion.div>

        <div className="relative">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {firstRow.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: event.id * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredEvent(event.id)}
                onHoverEnd={() => setHoveredEvent(null)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-32 group">
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
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-200/80 transition-colors duration-200 shadow"
                  >
                    {favorites.includes(event.id) ? (
                      <HeartIconSolid className="h-4 w-4 text-accent-500" />
                    ) : (
                      <HeartIcon className="h-4 w-4 text-gray-700" />
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {hoveredEvent === event.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-white/90 to-transparent"
                      >
                        <span className="text-xs font-medium text-primary-500">{event.description}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-3 flex flex-col h-[140px]">
                  <h3 className="font-display text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{event.title}</h3>
                  <div className="space-y-1 text-gray-700 text-xs">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1 text-primary-500 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1 text-primary-500 flex-shrink-0" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-primary-600 text-sm font-semibold whitespace-nowrap">{event.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-1.5 py-0.5 rounded-lg text-[10px] font-medium transition-all duration-300 shadow ml-2"
                      onClick={() => handleViewTickets(event)}
                    >
                      View Tickets
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {secondRow.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: event.id * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredEvent(event.id)}
                onHoverEnd={() => setHoveredEvent(null)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-32 group">
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
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-200/80 transition-colors duration-200 shadow"
                  >
                    {favorites.includes(event.id) ? (
                      <HeartIconSolid className="h-4 w-4 text-accent-500" />
                    ) : (
                      <HeartIcon className="h-4 w-4 text-gray-700" />
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {hoveredEvent === event.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-white/90 to-transparent"
                      >
                        <span className="text-xs font-medium text-primary-500">{event.description}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-3 flex flex-col h-[140px]">
                  <h3 className="font-display text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{event.title}</h3>
                  <div className="space-y-1 text-gray-700 text-xs">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1 text-primary-500 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1 text-primary-500 flex-shrink-0" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-primary-600 text-sm font-semibold whitespace-nowrap">{event.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-1.5 py-0.5 rounded-lg text-[10px] font-medium transition-all duration-300 shadow ml-2"
                      onClick={() => handleViewTickets(event)}
                    >
                      View Tickets
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-primary-50 transition z-10"
              aria-label="Previous Events"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-primary-50 transition z-10"
            aria-label="Next Events"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Page Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentPage ? 'bg-primary-500 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
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
                    onClick={() => handleBuyPPV(event)}
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
              {/* TODO: Fix hydration error resulting from dynamic rendering of the video frames */}
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

      {/* Add the ViewTicketsModal */}
      {selectedEvent && !isPPVPurchase && (
        <ViewTicketsModal
          isOpen={isViewTicketsModalOpen}
          onClose={() => {
            setIsViewTicketsModalOpen(false)
            setSelectedEvent(null)
          }}
          event={{
            title: selectedEvent.title,
            date: selectedEvent.date,
            venue: 'venue' in selectedEvent ? selectedEvent.venue : 'Online Event',
            price: selectedEvent.price,
            image: selectedEvent.image
          }}
        />
      )}

      {/* Keep the TicketPurchaseModal for PPV events */}
      {selectedEvent && isPPVPurchase && (
        <TicketPurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => {
            setIsPurchaseModalOpen(false)
            setSelectedEvent(null)
          }}
          event={{
            title: selectedEvent.title,
            date: selectedEvent.date,
            venue: 'venue' in selectedEvent ? selectedEvent.venue : 'Online Event',
            price: selectedEvent.price,
            image: selectedEvent.image
          }}
          isPPV={isPPVPurchase}
        />
      )}
    </section>
  )
}

export default FeaturedEvents 