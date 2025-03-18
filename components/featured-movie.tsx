"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { PlayIcon, PlusIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface FeaturedMovieProps {
  movie: {
    id: number
    title: string
    image: string
    rating: number
    year?: string
    duration?: string
    genre: string
    description: string
  }
}

export function FeaturedMovie({ movie }: FeaturedMovieProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleAddToWatchlist = () => {
    toast({
      title: t("added_to_watchlist"),
      description: `${movie.title} ${t("added_to_your_watchlist")}`,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden mb-12"
      style={{ height: "calc(70vh - 4rem)", minHeight: "400px", maxHeight: "700px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.image})`,
          transform: isHovering
            ? `scale(1.05) translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
            : "scale(1)",
          transition: "transform 0.3s ease-out",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white">{movie.title}</h1>

              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-md font-medium">{movie.rating} ★</span>
                {movie.year && <span>{movie.year}</span>}
                {movie.duration && <span>{movie.duration}</span>}
                <span>{movie.genre}</span>
              </div>

              <p className="text-base md:text-lg text-gray-200 mb-6 line-clamp-3 md:line-clamp-4">
                {movie.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <PlayIcon size={18} />
                  {t("watch_now")}
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={handleAddToWatchlist}>
                  <PlusIcon size={18} />
                  {t("add_to_watchlist")}
                </Button>
                <Link href={`/details/${movie.id}`}>
                  <Button size="lg" variant="ghost" className="gap-2">
                    <InfoIcon size={18} />
                    {t("more_info")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

