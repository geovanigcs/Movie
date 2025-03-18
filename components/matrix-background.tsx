"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "@/components/language-provider"
import { useTheme } from "@/components/theme-provider"

interface MatrixBackgroundProps {
  speed?: number
  density?: number
  className?: string
}

export default function MatrixBackground({ speed = 1, density = 1, className = "" }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { language } = useTranslation()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const characterSets = {
      pt: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÀÃÂÉÊÍÓÔÕÚÇáàãâéêíóôõúç0123456789",
      en: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      es: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÉÍÓÚÑÜáéíóúñü¿¡0123456789",
      ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789",
      jp: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789",
    }

    const characters = characterSets[language as keyof typeof characterSets] || characterSets.jp

    const fontSize = window.innerWidth <= 768 ? 14 : 16
    const columnWidth = fontSize * 0.6
    const dropSpeed = speed * (window.innerWidth <= 668 ? 14 : 16)

    const columns = Math.ceil(canvas.width / columnWidth) + 5 
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    const createGradient = (y: number) => {
      const position = Math.min(1, Math.max(0, y / canvas.height))

      if (theme === "dark") {
        const r = Math.floor(0 + position * 200)
        const g = Math.floor(20 + position * 220)
        const b = Math.floor(60 + position * 195)
        return `rgb(${r}, ${g}, ${b})`
      } else {
        const r = Math.floor(100 + position * 20)
        const g = Math.floor(180 + position * 40)
        const b = Math.floor(100 + position * 40)
        return `rgb(${r}, ${g}, ${b})`
      }
    }

    const draw = () => {
      ctx.fillStyle = theme === "dark" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        ctx.fillStyle = createGradient(drops[i])

        const x = i * columnWidth
        ctx.fillText(text, x, drops[i])

        drops[i] += dropSpeed

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -100)
        }
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [speed, density, language, theme])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 -z-10 ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  )
}

