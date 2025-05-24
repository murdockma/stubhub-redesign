import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, TicketIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface TicketPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    title: string
    date: string
    venue: string
    price: string
    image: string
  }
  isPPV?: boolean
}

const TicketPurchaseModal = ({ isOpen, onClose, event, isPPV = false }: TicketPurchaseModalProps) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    quantity: 1,
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the payment processing
    console.log('Form submitted:', formData)
    onClose()
  }

  const totalPrice = isPPV 
    ? parseFloat(event.price.replace('$', ''))
    : parseFloat(event.price.replace('From $', '')) * formData.quantity

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
                <h2 className="text-2xl font-semibold text-white">
                  {isPPV ? 'Purchase PPV Access' : 'Purchase Tickets'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Event Info */}
            <div className="p-6 border-b border-dark-300">
              <div className="flex items-start gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <p className="text-gray-400 mt-1">{event.date}</p>
                  <p className="text-gray-400">{event.venue}</p>
                </div>
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
                    {!isPPV && (
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
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-300/50 border border-dark-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Order Summary */}
              <div className="mt-6 p-4 bg-dark-300/30 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-4">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>{isPPV ? 'PPV Access' : 'Tickets'}</span>
                    <span>{event.price}</span>
                  </div>
                  {!isPPV && (
                    <div className="flex justify-between text-gray-300">
                      <span>Quantity</span>
                      <span>{formData.quantity}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300">
                    <span>Service Fee</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-dark-400 my-2" />
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

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
                {step < 2 ? (
                  <motion.button
                    type="button"
                    onClick={() => setStep(prev => prev + 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-auto px-6 py-3 rounded-lg bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                  >
                    Continue to Payment
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-auto px-6 py-3 rounded-lg bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/20 transition-all flex items-center gap-2"
                  >
                    <LockClosedIcon className="w-5 h-5" />
                    Complete Purchase
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

export default TicketPurchaseModal 