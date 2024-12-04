'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

interface DarkModeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <motion.button
      className={`p-2 rounded-full ${
        darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-yellow-100 text-gray-800'
      }`}
      onClick={toggleDarkMode}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 17 }}
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      <span className="sr-only">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </motion.button>
  )
}

