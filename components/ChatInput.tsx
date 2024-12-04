'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSubmit: (prompt: string) => void
  darkMode: boolean
  currentPrompt?: string
}

export default function ChatInput({ onSubmit, darkMode, currentPrompt = '' }: ChatInputProps) {
  const [inputValue, setInputValue] = useState(currentPrompt)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSubmit(inputValue.trim())
      setInputValue('')
    }
  }

  const gradientBorderClass = darkMode
    ? 'border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-border'
    : 'border-2 border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-400 bg-clip-border'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative p-[2px] rounded-full ${gradientBorderClass}`}>
        <Input
          type="text"
          placeholder="Type your creative prompt here ✨"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-full pr-12 rounded-full focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ease-in-out ${
            darkMode
              ? 'bg-gray-800 text-white focus:ring-purple-500'
              : 'bg-white text-gray-800 focus:ring-pink-300'
          }`}
        />
        <Button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full ${
            darkMode
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              : 'bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500'
          } transition-all duration-300 ease-in-out`}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

