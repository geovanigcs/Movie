"use client"

import { AppLayout } from "@/components/app-layout"
import { ContentSection } from "@/components/content-section"
import { useTranslation } from "@/components/language-provider"
import { GenreSection } from "@/components/genre-section"

export default function MoviesPage() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="space-y-12">
        <ContentSection title={t("trending_movies")} items={movieItems} />

        <ContentSection title={t("new_releases")} items={newReleases} />

        <GenreSection />

        <ContentSection title={t("recommended_for_you")} items={recommendedMovies} />
      </div>
    </AppLayout>
  )
}

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
    image: "/deadewolve.jpg",
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

const newReleases = [
  {
    id: 6,
    title: "Furiosa",
    image: "/furiosa.jpeg",
    rating: 7.8,
    episodes: 1,
    genre: "Ação",
    type: "movie",
  },
  {
    id: 7,
    title: "Godzilla x Kong",
    image: "/kong.jpg",
    rating: 7.7,
    episodes: 1,
    genre: "Ação",
    type: "movie",
  },
  {
    id: 8,
    title: "Alien: Romulus",
    image: "/alien.jpeg",
    rating: 7.6,
    episodes: 1,
    genre: "Terror",
    type: "movie",
  },
  {
    id: 9,
    title: "Twisters",
    image: "/twisters.jpg",
    rating: 7.2,
    episodes: 1,
    genre: "Aventura",
    type: "movie",
  },
  {
    id: 10,
    title: "Planeta dos Macacos: O Reinado",
    image: "/macaco.jpg",
    rating: 7.9,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
]

const recommendedMovies = [
  {
    id: 11,
    title: "Interstellar",
    image: "/Interestelar.jpeg",
    rating: 8.7,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 12,
    title: "Inception",
    image: "/inception.jpeg",
    rating: 8.8,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 13,
    title: "The Dark Knight",
    image: "/batman.jpg",
    rating: 9.0,
    episodes: 1,
    genre: "Ação",
    type: "movie",
  },
  {
    id: 14,
    title: "Pulp Fiction",
    image: "/pulp.jpg",
    rating: 8.9,
    episodes: 1,
    genre: "Crime",
    type: "movie",
  },
  {
    id: 15,
    title: "The Godfather",
    image: "/chefao.jpg",
    rating: 9.2,
    episodes: 1,
    genre: "Crime",
    type: "movie",
  },
]

