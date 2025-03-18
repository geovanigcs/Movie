"use client"

import type React from "react"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { ContentSection } from "@/components/content-section"
import { GenreSection } from "@/components/genre-section"
import { FeaturedMovie } from "@/components/featured-movie"
import { useTranslation } from "@/components/language-provider"
import { motion } from "framer-motion"

export default function Home() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("all")

  return (
    <AppLayout>
      <FeaturedMovie movie={featuredMovie} />

      <div className="flex gap-2 mb-6 border-b border-blue-950/50">
        <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          {t("all")}
        </TabButton>
        <TabButton active={activeTab === "movies"} onClick={() => setActiveTab("movies")}>
          {t("movies")}
        </TabButton>
        <TabButton active={activeTab === "series"} onClick={() => setActiveTab("series")}>
          {t("series")}
        </TabButton>
        <TabButton active={activeTab === "anime"} onClick={() => setActiveTab("anime")}>
          {t("anime")}
        </TabButton>
      </div>

      <div className="space-y-12">
        <ContentSection title={t("continue_watching")} items={continueWatchingItems} showProgress />

        <ContentSection
          title={t("popular")}
          items={
            activeTab === "anime"
              ? animeItems
              : activeTab === "series"
                ? seriesItems
                : activeTab === "movies"
                  ? movieItems
                  : popularItems
          }
        />

        <GenreSection />
      </div>
    </AppLayout>
  )
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-primary/80"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  )
}

const featuredMovie = {
  id: 1,
  title: "Duna: Parte 2",
  image: "/duna2x.jpg",
  rating: 8.5,
  year: "2024",
  duration: "2h 46m",
  genre: "Ficção Científica",
  description:
    "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele deve impedir um futuro terrível que só ele pode prever.",
}

const continueWatchingItems = [
  {
    id: 1,
    title: "WandaVision",
    image: "/wandavision.jpg",
    progress: 75,
    remainingEpisodes: 1,
    type: "series",
  },
  {
    id: 2,
    title: "Rick and Morty",
    image: "/rickandmorty.jpg",
    progress: 40,
    remainingEpisodes: 3,
    type: "series",
  },
  {
    id: 3,
    title: "The Last of Us",
    image: "/thelastofus.jpeg",
    progress: 60,
    remainingEpisodes: 2,
    type: "series",
  },
]

const popularItems = [
  {
    id: 1,
    title: "The Last of Us",
    image: "/thelastofus.jpeg",
    rating: 8.7,
    episodes: 7,
    genre: "Drama",
    type: "series",
  },
  {
    id: 2,
    title: "House of the Dragon",
    image: "/houseofdragon.jpeg",
    rating: 8.4,
    episodes: 7,
    genre: "Sci-Fi & Fantasia",
    type: "series",
  },
  {
    id: 3,
    title: "Stranger Things",
    image: "/stranger.jpg",
    rating: 8.6,
    episodes: 13,
    genre: "Drama",
    type: "series",
  },
  {
    id: 4,
    title: "The Crown",
    image: "/thecrown.jpeg",
    rating: 8.3,
    episodes: 16,
    genre: "Drama",
    type: "series",
  },
  {
    id: 5,
    title: "The Boys",
    image: "/theboys.jpeg",
    rating: 8.5,
    episodes: 22,
    genre: "Sci-Fi & Fantasia",
    type: "series",
  },
]

const animeItems = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/attackontitan.jpeg",
    rating: 9.0,
    episodes: 25,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "/demonslayer.png",
    rating: 8.7,
    episodes: 27,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "/jujutsu.jpg",
    rating: 8.6,
    episodes: 17,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 4,
    title: "One Piece",
    image: "/onepiece.jpg",
    rating: 8.9,
    episodes: 18,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 5,
    title: "My Hero Academia",
    image: "/boku.jpeg",
    rating: 8.4,
    episodes: 34,
    genre: "Ação",
    type: "anime",
  },
]

const movieItems = [
  {
    id: 1,
    title: "Duna: Parte 2",
    image: "/Duna2.jpeg",
    rating: 8.5,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 2,
    title: "Oppenheimer",
    image: "/oppenheimer.jpeg",
    rating: 8.2,
    episodes: 1,
    genre: "Drama",
    type: "movie",
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    image: "/deadwolve.jpg",
    rating: 7.9,
    episodes: 1,
    genre: "Ação",
    type: "movie",
  },
  {
    id: 4,
    title: "Coringa: Delírio a Dois",
    image: "/coringa.jpg",
    rating: 7.5,
    episodes: 1,
    genre: "Crime",
    type: "movie",
  },
  {
    id: 5,
    title: "Gladiador 2",
    image: "/gladiador.jpg",
    rating: 8.0,
    episodes: 1,
    genre: "Ação",
    type: "movie",
  },
]

const seriesItems = [
  {
    id: 1,
    title: "The Last of Us",
    image: "/thelastofus.jpeg",
    rating: 8.7,
    episodes: 7,
    genre: "Drama",
    type: "series",
  },
  {
    id: 2,
    title: "House of the Dragon",
    image: "/houseofdragon.jpeg",
    rating: 8.4,
    episodes: 7,
    genre: "Sci-Fi & Fantasia",
    type: "series",
  },
  {
    id: 3,
    title: "Stranger Things",
    image: "/stranger.jpg",
    rating: 8.6,
    episodes: 13,
    genre: "Drama",
    type: "series",
  },
  {
    id: 4,
    title: "The Crown",
    image: "/thecrown.jpeg",
    rating: 8.3,
    episodes: 16,
    genre: "Drama",
    type: "series",
  },
  {
    id: 5,
    title: "The Boys",
    image: "/theboys.jpeg",
    rating: 8.5,
    episodes: 22,
    genre: "Sci-Fi & Fantasia",
    type: "series",
  },
]

