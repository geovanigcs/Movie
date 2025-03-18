"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { PlayIcon, PlusIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"
import { useWatchlist } from "@/components/watchlist-provider"
import { useRouter } from "next/navigation"

interface ContentCardProps {
  item: any
  showProgress?: boolean
}

export function ContentCard({ item, showProgress = false }: ContentCardProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { addToWatchlist, isInWatchlist } = useWatchlist()
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToWatchlist({
      id: item.id,
      title: item.title,
      image: item.image || "/placeholder.svg",
      rating: item.rating,
      type: item.type || "movie",
      episodes: item.episodes,
      genre: item.genre,
    })
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/player/${item.id}`)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = ((e.clientX - centerX) / (rect.width / 2)) * 15 
    const y = ((e.clientY - centerY) / (rect.height / 2)) * 15 * -1 

    setTilt({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 }) 
  }

  useEffect(() => {
    if (!isHovering && cardRef.current) {
      const timer = setTimeout(() => {
        setTilt({ x: 0, y: 0 })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isHovering])

  const inWatchlist = isInWatchlist(item.id)

  return (
    <Link href={`/details/${item.id}`}>
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{
              transform: `translateZ(20px)`, 
              transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent/0"></div>

          {showProgress && item.progress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <div className="h-full bg-primary" style={{ width: `${item.progress}%` }}></div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                className="rounded-full bg-primary text-primary-foreground h-10 w-10"
                onClick={handlePlay}
              >
                <PlayIcon className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant={inWatchlist ? "default" : "secondary"}
                className={`rounded-full h-10 w-10 ${inWatchlist ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={handleAddToWatchlist}
              >
                {inWatchlist ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div
          className="p-3"
          style={{
            transform: `translateZ(10px)`, 
            transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
        >
          <h3 className="font-semibold truncate">{item.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            {item.rating && (
              <>
                <span className="text-yellow-400">★ {item.rating}</span>
                <span>•</span>
              </>
            )}
            <span>
              {item.episodes} {item.episodes > 1 ? t("episodes") : t("episode")}
            </span>
            {item.genre && (
              <>
                <span>•</span>
                <span>{item.genre}</span>
              </>
            )}
          </div>

          {showProgress && item.remainingEpisodes && (
            <div className="mt-2 text-xs text-muted-foreground">
              {item.remainingEpisodes} {t("episodes_remaining")}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

