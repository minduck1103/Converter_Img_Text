"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeIn, scaleIn } from "@/lib/animations"
import { ImageIcon } from "lucide-react"

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="w-full border-t">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-gray-500 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-gray-500 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/community" className="text-sm text-gray-500 hover:text-gray-900">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-sm text-gray-500 hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-sm text-gray-500 hover:text-gray-900">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-sm text-gray-500 hover:text-gray-900">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t pt-8">
            <p className="text-sm text-gray-500">
              © 2024 ImageToText. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <select
                className="text-xs text-gray-600 bg-transparent border-gray-200 rounded-md"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <motion.footer
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      animate="show"
      className="w-full border-t bg-gradient-to-b from-cyan-100 via-blue-100 to-indigo-100 shadow-inner ocean-footer relative rounded-t-3xl"
    >
      <div className="absolute left-0 right-0 -top-3 h-3 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="url(#oceanWaveFooter)" fillOpacity="0.3" d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" />
          <defs>
            <linearGradient id="oceanWaveFooter" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="0.5" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div variants={scaleIn(0.3)}>
            <h3 className="text-sm font-extrabold text-blue-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/features" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={scaleIn(0.3)}>
            <h3 className="text-sm font-extrabold text-blue-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={scaleIn(0.3)}>
            <h3 className="text-sm font-extrabold text-blue-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/community" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={scaleIn(0.3)}>
            <h3 className="text-sm font-extrabold text-blue-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-blue-700 hover:text-cyan-600 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="mt-10 border-t pt-8">
          <p className="text-sm text-gray-500">
            © 2025 ImageToText. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select
              className="text-xs text-gray-600 bg-transparent border-gray-200 rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              suppressHydrationWarning
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
