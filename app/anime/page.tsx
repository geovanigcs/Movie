"use client"

import { AppLayout } from "@/components/app-layout"
import { ContentSection } from "@/components/content-section"
import { useTranslation } from "@/components/language-provider"

export default function AnimePage() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="space-y-12">
        <ContentSection title={t("trending_anime")} items={animeItems} />

        <ContentSection title={t("new_episodes")} items={newEpisodes} />

        <ContentSection title={t("recommended_for_you")} items={recommendedAnime} />
      </div>
    </AppLayout>
  )
}

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

const newEpisodes = [
  {
    id: 6,
    title: "Chainsaw Man",
    image: "/chain.jpeg",
    rating: 8.5,
    episodes: 12,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 7,
    title: "Spy x Family",
    image: "/spy.jpeg",
    rating: 8.6,
    episodes: 25,
    genre: "Comédia",
    type: "anime",
  },
  {
    id: 8,
    title: "Vinland Saga",
    image: "/vinland.jpeg",
    rating: 8.8,
    episodes: 24,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 9,
    title: "Blue Lock",
    image: "/blue.jpeg",
    rating: 8.2,
    episodes: 24,
    genre: "Esportes",
    type: "anime",
  },
  {
    id: 10,
    title: "Oshi no Ko",
    image: "/oshi.jpg",
    rating: 8.7,
    episodes: 11,
    genre: "Drama",
    type: "anime",
  },
]

const recommendedAnime = [
  {
    id: 11,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "/fullmetal.jpg",
    rating: 9.1,
    episodes: 64,
    genre: "Ação",
    type: "anime",
  },
  {
    id: 12,
    title: "Death Note",
    image: "/death.jpeg",
    rating: 9.0,
    episodes: 37,
    genre: "Suspense",
    type: "anime",
  },
  {
    id: 13,
    title: "Hunter x Hunter",
    image: "/hunter.jpg",
    rating: 9.0,
    episodes: 148,
    genre: "Aventura",
    type: "anime",
  },
  {
    id: 14,
    title: "Steins;Gate",
    image: "/steins.jpg",
    rating: 9.0,
    episodes: 24,
    genre: "Sci-Fi",
    type: "anime",
  },
  {
    id: 15,
    title: "Cowboy Bebop",
    image: "/cowboy.jpeg",
    rating: 8.9,
    episodes: 26,
    genre: "Sci-Fi",
    type: "anime",
  },
]

