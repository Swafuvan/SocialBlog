// NotFoundPage.tsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button" // Use your own button component if needed
import { motion } from "framer-motion"
import { Rocket, Star, Moon, Sun } from 'lucide-react'

interface Star {
  id: number
  x: number
  y: number
}

export default function NotFoundPage() {
  const [stars, setStars] = useState<Star[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setStars(newStars)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-gray-900'}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </Button>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-bold mb-8"
      >
        404
      </motion.div>

      <h1 className="text-4xl font-bold mb-4 text-center">Oops! You've ventured into deep space</h1>
      <p className="text-xl mb-8 text-center">The page you're looking for seems to have drifted beyond our radar</p>

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <motion.div
        className="mb-8"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Rocket className="h-24 w-24 text-blue-500" />
      </motion.div>

      <Link to="/">
        <Button size="lg" className="text-lg">
          <Star className="mr-2 h-5 w-5" />
          Return to Home Galaxy
        </Button>
      </Link>
    </div>
  )
}
