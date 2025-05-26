import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface SellTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const SellTicketModal = ({ isOpen, onClose }: SellTicketModalProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setUploadedFiles(prev => [...prev, ...files])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the file upload
    console.log('Files to upload:', uploadedFiles)
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
            className="relative w-full max-w-lg bg-dark-200/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-300">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Upload Tickets</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Upload Area */}
            <form onSubmit={handleSubmit} className="p-6">
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? 'border-primary-500 bg-primary-500/10' : 'border-dark-400'
                } transition-colors duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                <ArrowUpTrayIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {isDragging ? 'Drop your tickets here' : 'Drag and drop your tickets'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  or click to browse files
                </p>
                <p className="text-gray-500 text-xs">
                  Supported formats: PDF, PNG, JPG
                </p>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-white mb-3">Uploaded Files</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-dark-300/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <ArrowUpTrayIcon className="w-5 h-5 text-primary-500" />
                          <span className="text-sm text-gray-300 truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={uploadedFiles.length === 0}
                  className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    uploadedFiles.length === 0
                      ? 'bg-dark-300 cursor-not-allowed'
                      : 'bg-gradient-primary hover:shadow-lg hover:shadow-primary-500/20'
                  }`}
                >
                  Upload Tickets
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SellTicketModal 