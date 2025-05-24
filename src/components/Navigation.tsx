'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, TicketIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import SellTicketModal from './SellTicketModal'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white text-gray-900 shadow-lg' : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/sh-logo.png" alt="StubHub Logo" className="h-24 w-44 -ml-4" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {['Events', 'Sports', 'Concerts', 'Theater'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      scrolled ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' : 'text-gray-300 hover:text-white hover:bg-dark-300/50'
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    scrolled ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' : 'text-gray-300 hover:text-white hover:bg-dark-300/50'
                  }`}
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsSellModalOpen(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-gradient-primary hover:shadow-lg hover:shadow-primary-500/20 ${
                    scrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  Sell Tickets
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-200/95 backdrop-blur-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['Events', 'Sports', 'Concerts', 'Theater'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-dark-300/50"
                  >
                    {item}
                  </Link>
                ))}
                <div className="pt-4 pb-3 border-t border-dark-300">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium mb-2 transition-colors duration-200 hover:bg-dark-300/50"
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSellModalOpen(true)
                      setIsOpen(false)
                    }}
                    className="w-full bg-gradient-primary text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20"
                  >
                    Sell Tickets
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Sell Ticket Modal */}
      <SellTicketModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />
    </>
  )
}

export default Navigation 