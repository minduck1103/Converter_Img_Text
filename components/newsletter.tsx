"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { fadeIn, scaleIn } from "@/lib/animations"

export default function Newsletter() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
  }

  if (!mounted) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Subscribe to our newsletter
              </h2>
              <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the latest updates on our products and services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <form className="flex flex-1 gap-2" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      animate="show"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div variants={scaleIn(0.3)}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get the latest updates on our products and services.
            </p>
          </motion.div>
          <motion.div variants={scaleIn(0.3)} className="flex flex-col gap-2 min-[400px]:flex-row">
            <form className="flex flex-1 gap-2" onSubmit={handleSubmit} suppressHydrationWarning>
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                suppressHydrationWarning
              />
              <Button type="submit" suppressHydrationWarning>Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
} 