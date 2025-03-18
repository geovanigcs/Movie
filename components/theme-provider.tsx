"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
})

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  attribute = "class",
}: {
  children: React.ReactNode
  defaultTheme?: "dark" | "light"
  attribute?: string
}) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || defaultTheme
    setTheme(savedTheme)
  }, [defaultTheme])

  useEffect(() => {
    if (!mounted) return

    localStorage.setItem("theme", theme)
    const root = window.document.documentElement
    root.setAttribute(attribute, theme)
  }, [theme, attribute, mounted])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

