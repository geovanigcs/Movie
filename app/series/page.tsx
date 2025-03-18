"use client"

import { AppLayout } from "@/components/app-layout"
import { ContentSection } from "@/components/content-section"
import { useTranslation } from "@/components/language-provider"

export default function SeriesPage() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="space-y-12">
        <ContentSection title={t("trending_series")} items={seriesItems} />

        <ContentSection title={t("new_episodes")} items={newEpisodes} />

        <ContentSection title={t("recommended_for_you")} items={recommendedSeries} />
      </div>
    </AppLayout>
  )
}

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

const newEpisodes = [
  {
    id: 6,
    title: "Fallout",
    image: "/fall.jpeg",
    rating: 8.1,
    episodes: 8,
    genre: "Sci-Fi & Fantasia",
    type: "series",
  },
  {
    id: 7,
    title: "Shogun",
    image: "/shogun.jpg",
    rating: 8.8,
    episodes: 10,
    genre: "Drama",
    type: "series",
  },
  {
    id: 8,
    title: "The Penguin",
    image: "/penguin.jpeg",
    rating: 8.2,
    episodes: 8,
    genre: "Crime",
    type: "series",
  },
  {
    id: 9,
    title: "Severance",
    image: "/severance.jpg",
    rating: 8.7,
    episodes: 9,
    genre: "Sci-Fi",
    type: "series",
  },
  {
    id: 10,
    title: "Yellowstone",
    image: "/stone.jpeg",
    rating: 8.4,
    episodes: 42,
    genre: "Drama",
    type: "series",
  },
]

const recommendedSeries = [
  {
    id: 11,
    title: "Breaking Bad",
    image: "/breaking.jpg",
    rating: 9.5,
    episodes: 62,
    genre: "Drama",
    type: "series",
  },
  {
    id: 12,
    title: "Game of Thrones",
    image: "/got.jpeg",
    rating: 9.2,
    episodes: 73,
    genre: "Fantasia",
    type: "series",
  },
  {
    id: 13,
    title: "The Wire",
    image: "/wire.jpg",
    rating: 9.3,
    episodes: 60,
    genre: "Crime",
    type: "series",
  },
  {
    id: 14,
    title: "The Sopranos",
    image: "/soprano.jpg",
    rating: 9.2,
    episodes: 86,
    genre: "Crime",
    type: "series",
  },
  {
    id: 15,
    title: "Chernobyl",
    image: "/chernobyl.jpg",
    rating: 9.4,
    episodes: 5,
    genre: "Drama",
    type: "series",
  },
]

