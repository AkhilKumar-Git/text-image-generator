'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingSteps = [
  "Started generating engine",
  "Add your flavor",
  "Opening creative canvas",
  "Painting the canvas",
  "Adding final touches",
  "Almost generated",
  "In 3... 2... 1... here you go!"
]

interface LoadingAnimationProps {
  darkMode: boolean
}

export default function LoadingAnimation({ darkMode }: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % loadingSteps.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
      >
        {loadingSteps[currentStep]}
      </motion.div>
    </AnimatePresence>
  )
}

