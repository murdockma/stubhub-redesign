'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { MagnifyingGlassIcon, XMarkIcon, TicketIcon, BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, BuildingLibraryIcon, MapPinIcon, MusicalNoteIcon, TrophyIcon, UserGroupIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { motion, useScroll, useTransform, useInView, AnimatePresence, Transition } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CalendarIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import ViewTicketsModal from './ViewTicketsModal'

const HeroSection = () => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [hoveredStatIdx, setHoveredStatIdx] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isViewTicketsModalOpen, setIsViewTicketsModalOpen] = useState(false)
  
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const router = useRouter()

  // Remove y, scale, and rotate transforms from background
  // const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]) // REMOVE
  // const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]) // REMOVE
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'linear-gradient(to bottom, #312e81 0%, #1e293b 100%)',
      'linear-gradient(to bottom, #a21caf 0%, #0ea5e9 100%)'
    ]
  )

  const trendingEvents = [
    {
      title: "NBA Playoffs 2024",
      description: "Witness the intensity of the NBA Playoffs",
      icon: "",
      color: "from-primary-500/20 to-primary-600/20",
      image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=1200&q=80",
      date: "April 15, 2024",
      venue: "Madison Square Garden",
      animation: {
        initial: { rotate: -10, scale: 0.8 },
        animate: { rotate: 10, scale: 1 },
        transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const }
      }
    },
    {
      title: "Taylor Swift Tour",
      description: "Experience the magic of The Eras Tour",
      icon: "",
      color: "from-primary-500/20 to-primary-600/20",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
      date: "May 20, 2024",
      venue: "SoFi Stadium",
      animation: {
        initial: { y: -10 },
        animate: { y: 10 },
        transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const }
      }
    },
    {
      title: "UEFA Champions League",
      description: "Watch Europe's elite football competition",
      icon: "",
      color: "from-primary-500/20 to-primary-600/20",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
      date: "June 1, 2024",
      venue: "Wembley Stadium",
      animation: {
        initial: { x: -10 },
        animate: { x: 10 },
        transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" as const }
      }
    }
  ]

  // Stadium sections data for SVG (full ring)
  const NUM_RING_SECTIONS = 24;
  const NUM_LOWER_SECTIONS = 8;
  const RING_RADIUS = 200;
  const LOWER_RADIUS = 140;
  const CENTER_X = 240;
  const CENTER_Y = 270;

  const ringSections = Array.from({ length: NUM_RING_SECTIONS }, (_, i) => {
    const angle = (2 * Math.PI * i) / NUM_RING_SECTIONS - Math.PI / 2;
    const x = CENTER_X + RING_RADIUS * Math.cos(angle) - 32;
    const y = CENTER_Y + RING_RADIUS * Math.sin(angle) - 24;
    return {
      id: `D${i + 1}`,
      label: `D${i + 1}`,
      price: 120,
      color: '#3b82f6',
      x,
      y,
      width: 64,
      height: 48,
    };
  });

  const lowerSections = Array.from({ length: NUM_LOWER_SECTIONS }, (_, i) => {
    const angle = (2 * Math.PI * i) / NUM_LOWER_SECTIONS - Math.PI / 2;
    const x = CENTER_X + LOWER_RADIUS * Math.sin(angle) - 28;
    const y = CENTER_Y + LOWER_RADIUS * Math.cos(angle) - 18;
    return {
      id: `SU${i + 1}`,
      label: `SU${i + 1}`,
      price: 180,
      color: '#a21caf',
      x,
      y,
      width: 56,
      height: 36,
    };
  });

  const stadiumSections = [
    ...ringSections,
    ...lowerSections,
    // Add a few special sections if desired
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    
    const startInterval = () => {
      if (!isModalOpen) {
        interval = setInterval(() => {
          setCurrentEventIndex((prev) => (prev + 1) % trendingEvents.length)
        }, 5000)
      }
    }

    startInterval()
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isModalOpen, trendingEvents.length])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = [
    { name: 'Concerts', icon: MusicalNoteIcon },
    { name: 'Sports', icon: TrophyIcon },
    { name: 'Theater', icon: UserGroupIcon },
    { name: 'Comedy', icon: FaceSmileIcon },
  ]

  // Memoize particle positions
  const particlePositions = useMemo(
    () => Array.from({ length: 20 }, () => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    })),
    []
  )

  // Memoize floating stars/tickets
  const floatingElements = useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({
      left: Math.random() * 90 + '%',
      top: Math.random() * 90 + '%',
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 4,
      isStar: i % 2 === 0,
    })),
    []
  )

  // Add mock stats and ticket listings for the modal
  const eventStats = {
    avgPrice: '$185',
    highPrice: '$450',
    lowPrice: '$65',
    capacity: '18,000',
    ticketsLeft: '1,200',
  }

  const ticketListings = [
    { id: 1, section: 'Floor A', row: '12', price: '$220', quantity: 2 },
    { id: 2, section: 'Floor B', row: '8', price: '$195', quantity: 1 },
    { id: 3, section: 'Section 112', row: '5', price: '$120', quantity: 4 },
    { id: 4, section: 'Section 210', row: '18', price: '$85', quantity: 2 },
    { id: 5, section: 'Balcony', row: '3', price: '$65', quantity: 1 },
    { id: 6, section: 'VIP Box', row: '-', price: '$450', quantity: 6 },
  ]

  const handleCategoryClick = (category: string) => {
    router.push({
      pathname: '/category/[category]',
      query: { category: category.toLowerCase() }
    })
  }

  return (
    <motion.div 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[url('/sh-background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
    >
      {/* Animated particles */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: 'rgba(99,102,241,0.18)' }}
              initial={{ x: pos.x, y: pos.y }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating stars and tickets */}
      {isClient && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {floatingElements.map((el, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: el.left, top: el.top }}
              initial={{ opacity: 0.5, scale: 0.8, y: 0 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.1, 0.8],
                y: [0, -30, 0],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: el.delay,
              }}
            >
              {el.isStar ? (
                // Star SVG
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="opacity-60">
                  <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" fill="#fff" fillOpacity="0.3" />
                </svg>
              ) : (
                // Ticket SVG
                <svg width="32" height="20" fill="none" viewBox="0 0 32 20" className="opacity-40">
                  <rect x="2" y="4" width="28" height="12" rx="3" fill="#fff" fillOpacity="0.15" stroke="#fff" strokeDasharray="4 2" />
                  <circle cx="6" cy="10" r="1.5" fill="#fff" fillOpacity="0.25" />
                  <circle cx="26" cy="10" r="1.5" fill="#fff" fillOpacity="0.25" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1 
            className="font-display text-2xl tracking-tight font-extrabold text-white sm:text-5xl md:text-5xl"
            style={{
              textShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
            }}
          >
            <motion.span 
              className="block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              It's Better When You're There
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-xl mx-auto"
        >
          <div className={`flex rounded-lg shadow-lg transition-all duration-300 ${
            searchFocused ? 'ring-2 ring-primary-500 scale-105' : ''
          }`}>
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 transition-colors duration-300 ${
                  searchFocused ? 'text-primary-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-dark-300 rounded-l-lg bg-dark-200/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                placeholder="Search for events, venues, or artists..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-4 border border-transparent text-base font-medium rounded-r-lg text-white bg-gradient-primary hover:shadow-lg hover:shadow-primary-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Trending Events Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 w-full max-w-7xl mx-auto"
        >
          <h2 className="font-display text-xl font-semibold text-gray-300 mb-6">Trending Now</h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEventIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className={`group rounded-xl backdrop-blur-sm bg-gradient-to-br ${trendingEvents[currentEventIndex].color} border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative h-80 md:h-96">
                      <motion.img
                        src={trendingEvents[currentEventIndex].image}
                        alt={trendingEvents[currentEventIndex].title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                      <motion.div
                        className="absolute top-4 right-4 text-4xl"
                        {...trendingEvents[currentEventIndex].animation}
                      >
                        {trendingEvents[currentEventIndex].icon}
                      </motion.div>
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <motion.h3 
                          className="text-3xl font-semibold text-white mb-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {trendingEvents[currentEventIndex].title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-300 mb-6 text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {trendingEvents[currentEventIndex].description}
                        </motion.p>
                        <div className="space-y-3">
                          <p className="text-white/60 text-lg">
                            <span className="text-white/70 font-bold">Date:</span>{' '}
                            <span className="inline-block border-b-2 border-primary-400 pb-0.5">
                              {trendingEvents[currentEventIndex].date}
                            </span>
                          </p>
                          <p className="text-white/60 text-lg">
                            <span className="text-white/70 font-bold">Venue:</span>{' '}
                            <span className="inline-block border-b-2 border-primary-400 pb-0.5">
                              {trendingEvents[currentEventIndex].venue}
                            </span>
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full py-4 px-6 rounded-lg bg-gradient-primary text-white font-medium text-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
                      >
                        View Tickets
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-4 space-x-2">
              {trendingEvents.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentEventIndex ? 'bg-primary-400 w-4' : 'bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Seat Map Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-3xl h-[600px] bg-dark-200/80 rounded-xl shadow-2xl overflow-y-auto overflow-x-hidden backdrop-blur flex flex-col"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={e => { e.stopPropagation(); setIsModalOpen(false); }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <div className="p-6 flex flex-col h-full justify-between">
                  {/* Event Stats */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {trendingEvents[currentEventIndex].title} Tickets
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Avg Price', value: eventStats.avgPrice, icon: BanknotesIcon },
                        { label: 'High', value: eventStats.highPrice, icon: ArrowTrendingUpIcon },
                        { label: 'Low', value: eventStats.lowPrice, icon: ArrowTrendingDownIcon },
                        { label: 'Capacity', value: eventStats.capacity, icon: BuildingLibraryIcon },
                        { label: 'Tickets Left', value: eventStats.ticketsLeft, icon: TicketIcon },
                        { label: 'Best Section', value: '112', icon: MapPinIcon },
                      ].map((stat, idx) => (
                        <motion.div
                          key={stat.label}
                          onMouseEnter={() => setHoveredStatIdx(idx)}
                          onMouseLeave={() => setHoveredStatIdx(null)}
                          animate={{ scale: hoveredStatIdx === idx ? 1.07 : 1, backgroundColor: hoveredStatIdx === idx ? 'rgba(99, 102, 241, 0.4)' : 'rgba(0,0,0,0)' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="relative rounded-lg p-3 text-center bg-gradient-to-br from-primary-500/30 to-primary-800/40 shadow border border-primary-700/30 transition-all duration-200 flex flex-col items-center backdrop-blur-sm overflow-visible min-h-[120px]"
                        >
                          {/* Dynamic Rotating Arc */}
                          <motion.div
                            key={hoveredStatIdx === idx ? 'fast' : 'slow'}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                            animate={{
                              rotate: 360,
                              filter: hoveredStatIdx === idx ? 'drop-shadow(0 0 8px white)' : 'none',
                            }}
                            transition={{
                              rotate: { repeat: Infinity, duration: hoveredStatIdx === idx ? 1 : 3, ease: 'linear' },
                              filter: { duration: 0.3 },
                            }}
                            style={{ pointerEvents: 'none' }}
                          >
                            <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" className="absolute top-0 left-0 w-full h-full">
                              <path
                                d="M32 4
                                  a 28 28 0 0 1 0 56
                                  a 28 28 0 0 1 0 -56"
                                stroke="white"
                                strokeWidth="3"
                                strokeDasharray="60 120"
                                strokeLinecap="round"
                                opacity="0.7"
                              />
                            </svg>
                          </motion.div>
                          {/* Icon with dynamic hover */}
                          <motion.span
                            className="relative z-10 mb-1 flex items-center justify-center"
                            animate={{ scale: hoveredStatIdx === idx ? 1.18 : 1, rotate: hoveredStatIdx === idx ? [0, 10, -10, 0] : 0 }}
                            transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
                          >
                            <stat.icon className="h-6 w-6 text-primary-100" />
                          </motion.span>
                          <div className="text-primary-100 text-xs font-semibold tracking-wide mb-1 relative z-10">{stat.label}</div>
                          <div className="text-xl font-extrabold text-white drop-shadow-sm relative z-10">{stat.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Ticket Listings */}
                  <div className="flex-1 overflow-y-auto">
                    <h4 className="text-lg font-semibold text-white mb-4">Available Tickets</h4>
                    <ul className="divide-y divide-dark-400">
                      {ticketListings.map((ticket) => (
                        <li key={ticket.id} className="flex items-center justify-between py-4 px-2 hover:bg-dark-300/40 rounded-lg transition">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
                            <span className="text-primary-400 font-semibold">{ticket.section}</span>
                            <span className="text-gray-300 text-sm">Row: {ticket.row}</span>
                            <span className="text-gray-300 text-sm">Qty: {ticket.quantity}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold text-primary-400">{ticket.price}</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow"
                            >
                              Buy
                            </motion.button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popular Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="font-display text-xl font-semibold text-gray-300 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredCategory(category.name)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="relative group"
              >
                <motion.button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`w-full p-4 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                    selectedCategory === category.name
                      ? 'bg-gradient-primary text-white'
                      : 'bg-dark-200/30 hover:bg-dark-200/50 text-white'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <motion.span 
                      className="text-2xl"
                      animate={{
                        scale: hoveredCategory === category.name ? [1, 1.2, 1] : 1,
                        rotate: hoveredCategory === category.name ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <category.icon className="h-8 w-8" />
                    </motion.span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </motion.button>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={false}
                  animate={{
                    scale: hoveredCategory === category.name ? 1.1 : 1,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HeroSection 