'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const examples = [
  "Sci-fi cat with thug life hat and cigar",
  "Cyberpunk battleship with flowered paint pattern",
  "Star flooded sky with a tint of rainbow",
  "Cinematic glittery butterfly sitting on a zooming car"
]

interface TypewriterTitleProps {
  darkMode: boolean
}

export default function TypewriterTitle({ darkMode }: TypewriterTitleProps) {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const example = examples[currentExampleIndex]

    if (!isDeleting && currentText === example) {
      setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false)
      setCurrentExampleIndex((currentExampleIndex + 1) % examples.length)
    } else {
      const timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? example.substring(0, currentText.length - 1)
            : example.substring(0, currentText.length + 1)
        )
      }, isDeleting ? 50 : 100)

      return () => clearTimeout(timeout)
    }
  }, [currentExampleIndex, currentText, isDeleting])

  const gradientClass = darkMode
    ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400'
    : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-400'

  return (
    <h1 className="text-4xl font-bold text-center mb-8">
      Generate a{' '}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentExampleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${gradientClass} text-transparent bg-clip-text inline-block`}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </h1>
  )
}

