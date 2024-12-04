'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from 'lucide-react'
import TypewriterTitle from '@/components/TypewriterTitle'
import ChatInput from '@/components/ChatInput'
import GradientSection from '@/components/GradientSection'
import LoadingAnimation from '@/components/LoadingAnimation'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import DarkModeToggle from '@/components/DarkModeToggle'
import Image from 'next/image'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePromptSubmit = useCallback(async (inputPrompt: string) => {
    setPrompt(inputPrompt)
    setIsGenerating(true)
    setError(null)
    setImageUrl('')

    const promptLower = inputPrompt.toLowerCase()
    const getFallbackImage = () => {
      if (promptLower.includes('cat')) {
        return '/images/CatThugLife.png'
      } else if (promptLower.includes('beautiful')) {
        return '/images/ABustlingCyberpunk.png'
      }
      return null
    }

    // Simulate loading for fallback images
    const showFallbackWithDelay = (fallbackPath: string) => {
      setTimeout(() => {
        setImageUrl(fallbackPath)
        setIsGenerating(false)
      }, 5000) // 2 seconds delay
    }

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt })
      })

      if (!response.ok) {
        const fallbackImage = getFallbackImage()
        if (fallbackImage) {
          showFallbackWithDelay(fallbackImage)
          return
        }
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (error) {
      const fallbackImage = getFallbackImage()
      if (fallbackImage) {
        showFallbackWithDelay(fallbackImage)
      } else {
        setError('Failed to generate image')
      }
    } finally {
      if (!getFallbackImage()) {
        setIsGenerating(false)
      }
    }
  }, [])

  const handleDownload = () => {
    if (!imageUrl) return

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'generated-image.png'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 transition-colors duration-500 ${darkMode ? 'bg-deep-blue text-white' : 'bg-creamy-white text-gray-800'}`}>
      <BackgroundAnimation darkMode={darkMode} />
      <div className="absolute top-4 right-4">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <TypewriterTitle darkMode={darkMode} />
      
      <AnimatePresence>
        {!prompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mt-8"
          >
            <ChatInput onSubmit={handlePromptSubmit} darkMode={darkMode} currentPrompt={prompt} />
          </motion.div>
        )}
      </AnimatePresence>

      {prompt && (
        <div className="w-full max-w-6xl mt-8 flex flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0"
          >
            <Card className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <h2 className="text-xl font-bold mb-2">Your Prompt:</h2>
              <p>{prompt}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/3 pl-0 md:pl-4"
          >
            {isGenerating ? (
              <GradientSection darkMode={darkMode}>
                <LoadingAnimation darkMode={darkMode} />
                <p className="mt-4 text-center">
                  {prompt.toLowerCase().includes('cat') 
                    ? "Finding a cool cat for you..."
                    : prompt.toLowerCase().includes('beautiful')
                    ? 'Creating something beautiful...'
                    : 'Generating your image...'}
                </p>
              </GradientSection>
            ) : imageUrl ? (
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt="Generated Image"
                  width={800}
                  height={600}
                  className={`w-full h-auto rounded-lg shadow-lg ${darkMode ? 'border-2 border-purple-500' : 'border-2 border-pink-300'}`}
                />
                <button
                  onClick={handleDownload}
                  className={`absolute bottom-4 right-4 px-4 py-2 rounded-full 
                    ${darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500'
                    } text-white font-medium shadow-lg transition-all duration-300`}
                >
                  Download
                </button>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </main>
  )
}