"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon, ChevronDown, FileText, Code2, Table2, Calculator } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, scaleIn } from "@/lib/animations"

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false)
  }, [])

  const menuItems = [
    { href: "/demo?type=text", icon: FileText, label: "Image to Text" },
    { href: "/demo?type=code", icon: Code2, label: "Image to Code" },
    { href: "/demo?type=table", icon: Table2, label: "Image to Table" },
    { href: "/demo?type=math", icon: Calculator, label: "Image to Math" }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 shadow-lg ocean-header relative">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2"
            variants={fadeIn('left', 0.1)}
            initial="hidden"
            animate="show"
          >
            <ImageIcon className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow">ImageToText</span>
          </motion.div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/#features" className="text-sm font-semibold text-blue-900 hover:text-cyan-600 transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-sm font-semibold text-blue-900 hover:text-cyan-600 transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="text-sm font-semibold text-blue-900 hover:text-cyan-600 transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="text-sm font-semibold text-blue-900 hover:text-cyan-600 transition-colors">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              type="button"
              className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-cyan-600 transition-colors"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              suppressHydrationWarning
            >
              Convert
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white/90 ring-1 ring-cyan-200 z-50 backdrop-blur-md"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="convert-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    {menuItems.map(({ href, icon: Icon, label }) => (
                      <Link 
                        key={href}
                        href={href}
                        className="flex items-center px-4 py-2 text-sm text-blue-900 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                        onClick={closeDropdown}
                      >
                        <Icon className="h-4 w-4 mr-2 text-cyan-500" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/demo">
            <Button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-blue-600 hover:to-cyan-400 text-white font-bold shadow-lg px-6 py-2 rounded-full transition-all duration-300 border-2 border-white/30 hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute left-0 right-0 -bottom-2 h-3 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="url(#oceanWave)" fillOpacity="0.3" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          <defs>
            <linearGradient id="oceanWave" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="0.5" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </header>
  )
}
