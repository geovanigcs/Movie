"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { PlayIcon, ClockIcon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function RecentPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState("all")

  const filteredItems = filter === "all" ? recentItems : recentItems.filter((item) => item.type === filter)

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("recent")}</h1>
        <p className="text-muted-foreground">{t("recently_watched_content")}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="rounded-full"
        >
          {t("all")}
        </Button>
        <Button
          variant={filter === "movie" ? "default" : "outline"}
          onClick={() => setFilter("movie")}
          className="rounded-full"
        >
          {t("movies")}
        </Button>
        <Button
          variant={filter === "series" ? "default" : "outline"}
          onClick={() => setFilter("series")}
          className="rounded-full"
        >
          {t("series")}
        </Button>
        <Button
          variant={filter === "anime" ? "default" : "outline"}
          onClick={() => setFilter("anime")}
          className="rounded-full"
        >
          {t("anime")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/details/${item.id}`}>
              <div className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all">
                <div className="relative aspect-video">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${item.progress}%` }}></div>
                  </div>

                  <div className="absolute top-2 right-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded-md flex items-center">
                    <ClockIcon size={12} className="mr-1" />
                    {item.watchedTime}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      <PlayIcon size={18} />
                      {t("continue_watching")}
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-yellow-400">★ {item.rating}</span>
                      <span>•</span>
                      <span>
                        {item.type === "movie" ? t("movie") : item.type === "series" ? t("series") : t("anime")}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.lastWatched}</div>
                  </div>

                  {item.nextEpisode && (
                    <div className="mt-2 text-sm">
                      {t("next")}: {item.nextEpisode}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  )
}

const recentItems = [
  {
    id: 101,
    title: "The Last of Us",
    image: "/thelastofusx.jpg",
    rating: 8.7,
    type: "series",
    progress: 75,
    watchedTime: "45:20",
    lastWatched: "Hoje",
    nextEpisode: "S01E06 - Kin",
  },
  {
    id: 1,
    title: "Duna: Parte 2",
    image: "/duna2x.jpg",
    rating: 8.5,
    type: "movie",
    progress: 35,
    watchedTime: "1:05:40",
    lastWatched: "Ontem",
  },
  {
    id: 201,
    title: "Attack on Titan",
    image: "/titanx.jpeg",
    rating: 9.0,
    type: "anime",
    progress: 90,
    watchedTime: "20:15",
    lastWatched: "2 dias atrás",
    nextEpisode: "S04E06 - The War Hammer Titan",
  },
  {
    id: 102,
    title: "House of the Dragon",
    image: "/dragonx.jpg",
    rating: 8.4,
    type: "series",
    progress: 60,
    watchedTime: "32:45",
    lastWatched: "3 dias atrás",
    nextEpisode: "S01E08 - The Lord of the Tides",
  },
  {
    id: 2,
    title: "Oppenheimer",
    image: "/oppenx.jpeg",
    rating: 8.2,
    type: "movie",
    progress: 15,
    watchedTime: "30:20",
    lastWatched: "Semana passada",
  },
  {
    id: 202,
    title: "Demon Slayer",
    image: "/kimetsux.jpg",
    rating: 8.7,
    type: "anime",
    progress: 45,
    watchedTime: "12:50",
    lastWatched: "Semana passada",
    nextEpisode: "S02E03 - Should Have Been",
  },
]

