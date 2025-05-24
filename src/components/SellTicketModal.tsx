import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, TicketIcon, CalendarIcon, MapPinIcon, BanknotesIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface SellTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const SellTicketModal = ({ isOpen, onClose }: SellTicketModalProps) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    venue: '',
    section: '',
    row: '',
    quantity: 1,
    price: '',
    description: '',
    ticketType: 'physical', // or 'digital'
    deliveryMethod: 'standard', // or 'express'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData)
    onClose()
  }

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
            className="relative w-full max-w-2xl bg-dark-200/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-300">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">List Your Tickets</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              {/* Progress Steps */}
              <div className="mt-6 flex items-center justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= stepNumber
                          ? 'bg-primary-500 text-white'
                          : 'bg-dark-300 text-gray-400'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`w-24 h-1 mx-2 ${
                          step > stepNumber ? 'bg-primary-500' : 'bg-dark-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Event Name
                      </label>
                      <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter event name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Event Date
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Venue
                        </label>
                        <input
                          type="text"
                          name="venue"
                          value={formData.venue}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter venue"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Section
                        </label>
                        <input
                          type="text"
                          name="section"
                          value={formData.section}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., Floor A"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Row
                        </label>
                        <input
                          type="text"
                          name="row"
                          value={formData.row}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., 12"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Price per Ticket
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full pl-8 pr-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ticket Type
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, ticketType: 'physical' }))}
                          className={`p-4 rounded-lg border ${
                            formData.ticketType === 'physical'
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-dark-400 bg-dark-300/50'
                          } text-white transition-all duration-200`}
                        >
                          <TicketIcon className="w-6 h-6 mx-auto mb-2" />
                          Physical Ticket
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, ticketType: 'digital' }))}
                          className={`p-4 rounded-lg border ${
                            formData.ticketType === 'digital'
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-dark-400 bg-dark-300/50'
                          } text-white transition-all duration-200`}
                        >
                          <TicketIcon className="w-6 h-6 mx-auto mb-2" />
                          Digital Ticket
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Delivery Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'standard' }))}
                          className={`p-4 rounded-lg border ${
                            formData.deliveryMethod === 'standard'
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-dark-400 bg-dark-300/50'
                          } text-white transition-all duration-200`}
                        >
                          Standard Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'express' }))}
                          className={`p-4 rounded-lg border ${
                            formData.deliveryMethod === 'express'
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-dark-400 bg-dark-300/50'
                          } text-white transition-all duration-200`}
                        >
                          Express Delivery
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Add any additional details about your tickets..."
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <motion.button
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-lg bg-dark-300 text-white hover:bg-dark-400 transition-colors"
                  >
                    Back
                  </motion.button>
                )}
                {step < 3 ? (
                  <motion.button
                    type="button"
                    onClick={() => setStep(prev => prev + 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-auto px-6 py-3 rounded-lg bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-auto px-6 py-3 rounded-lg bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                  >
                    List Tickets
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SellTicketModal 