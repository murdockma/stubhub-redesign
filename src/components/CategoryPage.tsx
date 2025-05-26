'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { FunnelIcon } from '@heroicons/react/24/outline'
import ViewTicketsModal from './ViewTicketsModal'

interface Event {
  id: number
  title: string
  date: string
  venue: string
  image: string
  price: string
  description: string
  category: string
}

interface CategoryPageProps {
  category: string
  events: Event[]
}

const CategoryPage = ({ category, events }: CategoryPageProps) => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [dateRange, setDateRange] = useState<[string, string]>(['', ''])
  const [isViewTicketsModalOpen, setIsViewTicketsModalOpen] = useState(false)

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const filteredEvents = events.filter(event => {
    const price = parseInt(event.price.replace(/[^0-9]/g, ''))
    const eventDate = new Date(event.date)
    const startDate = dateRange[0] ? new Date(dateRange[0]) : null
    const endDate = dateRange[1] ? new Date(dateRange[1]) : null

    return (
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      (!startDate || eventDate >= startDate) &&
      (!endDate || eventDate <= endDate)
    )
  })

  const handleViewTickets = (event: Event) => {
    setSelectedEvent(event.id)
    setIsViewTicketsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold capitalize">{category} Events</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-24 px-3 py-2 bg-gray-700 rounded-lg"
                    placeholder="Min"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-24 px-3 py-2 bg-gray-700 rounded-lg"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Date Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    value={dateRange[0]}
                    onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                    className="px-3 py-2 bg-gray-700 rounded-lg"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={dateRange[1]}
                    onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                    className="px-3 py-2 bg-gray-700 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(event.id)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  {favorites.includes(event.id) ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <p className="text-gray-400 mb-4">{event.venue}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{event.price}</span>
                  <button
                    onClick={() => handleViewTickets(event)}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Tickets
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ViewTicketsModal */}
      {selectedEvent && (
        <ViewTicketsModal
          isOpen={isViewTicketsModalOpen}
          onClose={() => {
            setIsViewTicketsModalOpen(false)
            setSelectedEvent(null)
          }}
          event={{
            title: events.find(e => e.id === selectedEvent)?.title || '',
            date: events.find(e => e.id === selectedEvent)?.date || '',
            venue: events.find(e => e.id === selectedEvent)?.venue || '',
            price: events.find(e => e.id === selectedEvent)?.price || '',
            image: events.find(e => e.id === selectedEvent)?.image || ''
          }}
        />
      )}
    </div>
  )
}

export default CategoryPage 