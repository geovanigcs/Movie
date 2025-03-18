"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/components/language-provider"

export interface WatchlistItem {
  id: number
  title: string
  image: string
  rating: number
  type: "movie" | "series" | "anime"
  episodes?: number
  genre?: string
}

interface WatchlistContextType {
  watchlist: WatchlistItem[]
  addToWatchlist: (item: WatchlistItem) => void
  removeFromWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean
  count: number
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const { t } = useTranslation()
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist")
    if (storedWatchlist) {
      try {
        setWatchlist(JSON.parse(storedWatchlist))
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage:", error)
      }
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
  }, [watchlist, initialized])

  const addToWatchlist = (item: WatchlistItem) => {
    if (!isInWatchlist(item.id)) {
      setWatchlist((prev) => [...prev, item])
      toast({
        title: t("added_to_watchlist"),
        description: `${item.title} ${t("added_to_your_watchlist")}`,
      })
    } else {
      toast({
        title: t("already_in_watchlist"),
        description: `${item.title} ${t("is_already_in_your_watchlist")}`,
      })
    }
  }

  const removeFromWatchlist = (id: number) => {
    const itemToRemove = watchlist.find((item) => item.id === id)
    if (itemToRemove) {
      setWatchlist((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: t("removed_from_watchlist"),
        description: `${itemToRemove.title} ${t("has_been_removed")}`,
      })
    }
  }

  const isInWatchlist = (id: number) => {
    return watchlist.some((item) => item.id === id)
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        count: watchlist.length,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}

