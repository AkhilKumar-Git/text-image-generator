'use client'

import { motion } from 'framer-motion'

interface GradientSectionProps {
  children: React.ReactNode
  darkMode: boolean
}

export default function GradientSection({ children, darkMode }: GradientSectionProps) {
  const gradientClass = darkMode
    ? 'from-blue-600 via-purple-600 to-teal-600'
    : 'from-yellow-400 via-pink-500 to-blue-400'

  return (
    <motion.div
      className={`w-full h-96 rounded-lg overflow-hidden relative border-2 ${
        darkMode ? 'border-purple-500' : 'border-pink-300'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  )
}

