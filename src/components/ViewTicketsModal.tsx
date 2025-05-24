import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, TicketIcon, BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, BuildingLibraryIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface ViewTicketsModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    title: string
    date: string
    venue: string
    price: string
    image: string
  }
}

const ViewTicketsModal = ({ isOpen, onClose, event }: ViewTicketsModalProps) => {
  const [hoveredStatIdx, setHoveredStatIdx] = useState<number | null>(null)
  const [hoveredTicketIdx, setHoveredTicketIdx] = useState<number | null>(null)

  // Mock event stats
  const eventStats = {
    avgPrice: '$185',
    highPrice: '$450',
    lowPrice: '$65',
    capacity: '18,000',
    ticketsLeft: '1,200',
  }

  // Mock ticket listings
  const ticketListings = [
    { id: 1, section: 'Floor A', row: '12', price: '$220', quantity: 2 },
    { id: 2, section: 'Floor B', row: '8', price: '$195', quantity: 1 },
    { id: 3, section: 'Section 112', row: '5', price: '$120', quantity: 4 },
    { id: 4, section: 'Section 210', row: '18', price: '$85', quantity: 2 },
    { id: 5, section: 'Balcony', row: '3', price: '$65', quantity: 1 },
    { id: 6, section: 'VIP Box', row: '-', price: '$450', quantity: 6 },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-dark-200/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with Event Info */}
            <div className="p-6 border-b border-dark-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">Available Tickets</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                  <p className="text-gray-400 text-sm">{event.date}</p>
                  <p className="text-gray-400 text-sm">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Event Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Avg Price', value: eventStats.avgPrice, icon: BanknotesIcon },
                  { label: 'High', value: eventStats.highPrice, icon: ArrowTrendingUpIcon },
                  { label: 'Low', value: eventStats.lowPrice, icon: ArrowTrendingDownIcon },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    className="relative bg-dark-300/50 rounded-xl p-3 overflow-hidden flex flex-col items-center text-center"
                    onHoverStart={() => setHoveredStatIdx(idx)}
                    onHoverEnd={() => setHoveredStatIdx(null)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20"
                      initial={false}
                      animate={{
                        opacity: hoveredStatIdx === idx ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="relative z-10 mb-1 flex items-center justify-center"
                      animate={{ scale: hoveredStatIdx === idx ? 1.18 : 1, rotate: hoveredStatIdx === idx ? [0, 10, -10, 0] : 0 }}
                      transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
                    >
                      <stat.icon className="h-5 w-5 text-primary-100" />
                    </motion.span>
                    <div className="text-primary-100 text-xs font-semibold tracking-wide mb-1 relative z-10">{stat.label}</div>
                    <div className="text-lg font-bold text-white drop-shadow-sm relative z-10">{stat.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Ticket Listings */}
              <div className="space-y-2">
                {ticketListings.map((ticket, idx) => (
                  <motion.div
                    key={ticket.id}
                    className="relative bg-dark-300/30 rounded-lg overflow-hidden"
                    onHoverStart={() => setHoveredTicketIdx(idx)}
                    onHoverEnd={() => setHoveredTicketIdx(null)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10"
                      initial={false}
                      animate={{
                        opacity: hoveredTicketIdx === idx ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="relative z-10 flex items-center justify-between p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <span className="text-primary-400 font-semibold">{ticket.section}</span>
                        <span className="text-gray-300 text-sm">Row: {ticket.row}</span>
                        <span className="text-gray-300 text-sm">Qty: {ticket.quantity}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-primary-400">{ticket.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow"
                        >
                          Buy
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ViewTicketsModal 