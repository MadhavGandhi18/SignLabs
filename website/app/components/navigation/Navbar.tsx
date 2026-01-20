'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NavbarProps {
  onScrollToSection?: (sectionId: string) => void
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Direct scroll function for when used outside of pages with passed props
  const scrollToSection = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-12 py-4">
      <nav className={`max-w-7xl mx-auto rounded-xl transition-all duration-300 ${
        scrolled ? 'bg-white/70 shadow-lg' : 'bg-white/50'
      } backdrop-blur-md px-4 sm:px-6 py-3`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 20 }}
              className="bg-primary/10 p-2 rounded-xl"
            >
              <Image 
                src="/images/hand-icon.svg"
                alt="Hand Icon" 
                width={32} 
                height={32}
                className="brightness-0 invert"
              />
            </motion.div>
            <span className="text-xl font-semibold text-gray-900">SignLapse</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <button 
              onClick={() => scrollToSection('process')}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer text-sm md:text-base"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer text-sm md:text-base"
            >
              Our mission
            </button>
            <Link 
              href="/files/sign-language-extension.zip" 
              className="border border-primary text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm md:text-base"
              download="SignLanguageExtension.zip"
            >
              Get Extension
            </Link>
            <Link 
              href="/auth/login"
              className="bg-primary text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md text-sm md:text-base"
              prefetch={true}
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}