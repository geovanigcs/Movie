"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"
import { ContentSection } from "@/components/content-section"
import { PlusIcon, PlayIcon, CheckIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useWatchlist } from "@/components/watchlist-provider"
import { useRouter } from "next/navigation"

export default function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { addToWatchlist, isInWatchlist } = useWatchlist()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    params.then(data => {
      setUnwrappedParams(data);
    });
  }, [params]);

  useEffect(() => {
    if (unwrappedParams) {
      const allContent = [...movieItems, ...seriesItems, ...animeItems]
      const foundContent = allContent.find((item) => item.id.toString() === unwrappedParams.id)

      setTimeout(() => {
        setContent(foundContent || movieItems[0])
        setLoading(false)
      }, 1000)
    }
  }, [unwrappedParams]);

  const handleAddToWatchlist = () => {
    if (content) {
      addToWatchlist({
        id: content.id,
        title: content.title,
        image: content.image || "/placeholder.svg",
        rating: content.rating,
        type: content.type || "movie",
        episodes: content.episodes,
        genre: content.genre,
      })
    }
  }

  const handlePlay = () => {
    router.push(`/player/${unwrappedParams?.id}`)
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    )
  }

  const inWatchlist = isInWatchlist(content?.id)

  return (
    <AppLayout>
      <div className="relative">
        <div className="relative h-[50vh] w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <img
            src={content?.image || "/placeholder.svg?height=600&width=1200"}
            alt={content?.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 z-20 p-8 w-full">
            <motion.h1
              className="text-5xl font-bold mb-2 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {content?.title}
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-yellow-400">★ {content?.rating}</span>
              <span className="text-muted-foreground">•</span>
              <span>
                {content?.episodes} {content?.episodes > 1 ? t("episodes") : t("episode")}
              </span>
              <span className="text-muted-foreground">•</span>
              <span>{content?.genre}</span>
            </motion.div>

            <motion.p
              className="text-muted-foreground max-w-2xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {content?.description || t("sample_description")}
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={handlePlay}>
                <PlayIcon size={16} />
                {t("watch_now")}
              </Button>
              <Button
                variant={inWatchlist ? "default" : "outline"}
                className={`gap-2 ${inWatchlist ? "bg-green-600 hover:bg-green-700 text-white border-none" : ""}`}
                onClick={handleAddToWatchlist}
              >
                {inWatchlist ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
                {inWatchlist ? t("in_watchlist") : t("add_to_watchlist")}
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          <ContentSection title={t("similar_content")} items={similarContent} />
          <ContentSection title={t("more_from_this_genre")} items={genreContent} />
        </div>
      </div>
    </AppLayout>
  )
}

// Dados de exemplo
const movieItems = [
  {
    id: 1,
    title: "Duna: Parte 2",
    image: "/duna2x.jpg",
    rating: 8.5,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
    description:
      "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.",
  },
  {
    id: 2,
    title: "Oppenheimer",
    image: "/oppenheimer.jpeg",
    rating: 8.2,
    episodes: 1,
    genre: "Drama",
    type: "movie",
    description:
      "A história do cientista americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.",
  },
]

const seriesItems = [
  {
    id: 101,
    title: "The Last of Us",
    image: "/thelastofus.jpeg",
    rating: 8.7,
    episodes: 7,
    genre: "Drama",
    type: "series",
    description:
      "Vinte anos após a queda da civilização, Joel é contratado para tirar Ellie de uma zona de quarentena opressiva.",
  },
]

const animeItems = [
  {
    id: 201,
    title: "Attack on Titan",
    image: "/attackontitan.jpeg",
    rating: 9.0,
    episodes: 25,
    genre: "Ação",
    type: "anime",
    description:
      "Em um mundo onde a humanidade vive dentro de cidades cercadas por enormes muralhas devido à ameaça dos Titãs, gigantes devoradores de humanos.",
  },
]

const similarContent = [
  {
    id: 301,
    title: "Blade Runner 2049",
    image: "/blade.jpg",
    rating: 8.0,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 302,
    title: "Arrival",
    image: "/arrival.jpg",
    rating: 7.9,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 303,
    title: "Foundation",
    image: "/foundation.jpg",
    rating: 7.5,
    episodes: 10,
    genre: "Ficção Científica",
    type: "series",
  },
  {
    id: 304,
    title: "Raised by Wolves",
    image: "/raised.jpg",
    rating: 7.4,
    episodes: 18,
    genre: "Ficção Científica",
    type: "series",
  },
  {
    id: 305,
    title: "Westworld",
    image: "/west.jpg",
    rating: 8.5,
    episodes: 36,
    genre: "Ficção Científica",
    type: "series",
  },
]

const genreContent = [
  {
    id: 401,
    title: "Interstellar",
    image: "/Interestelar.jpeg",
    rating: 8.6,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 402,
    title: "The Expanse",
    image: "/expanse.jpeg",
    rating: 8.5,
    episodes: 62,
    genre: "Ficção Científica",
    type: "series",
  },
  {
    id: 403,
    title: "Alien",
    image: "/alien.jpeg",
    rating: 8.4,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
  {
    id: 404,
    title: "Severance",
    image: "/severance.jpg",
    rating: 8.7,
    episodes: 9,
    genre: "Ficção Científica",
    type: "series",
  },
  {
    id: 405,
    title: "Inception",
    image: "/inception.jpeg",
    rating: 8.8,
    episodes: 1,
    genre: "Ficção Científica",
    type: "movie",
  },
]
