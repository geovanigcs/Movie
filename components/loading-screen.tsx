"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="mb-8"
              >
                <span className="text-4xl font-bold">
                  <span className="text-white">GIGIO&apos;S</span>{" "}
                  <span className="text-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.9)]">MOVIES</span>
                </span>
              </motion.div>

              <div className="flex gap-2">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    backgroundColor: ["#0ea5e9", "#06b6d4", "#0ea5e9"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.6,
                    delay: 0,
                  }}
                  className="h-3 w-3 rounded-full bg-primary"
                />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    backgroundColor: ["#0ea5e9", "#06b6d4", "#0ea5e9"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.6,
                    delay: 0.2,
                  }}
                  className="h-3 w-3 rounded-full bg-primary"
                />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    backgroundColor: ["#0ea5e9", "#06b6d4", "#0ea5e9"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.6,
                    delay: 0.4,
                  }}
                  className="h-3 w-3 rounded-full bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}

