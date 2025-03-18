"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlayerPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const allContent = [...movieItems, ...seriesItems, ...animeItems]
    const foundContent = allContent.find((item) => item.id.toString() === params.id)

    setTimeout(() => {
      setContent(foundContent || { title: "Conteúdo", type: "movie" })
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="relative">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>

        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6 text-primary">{t("coming_soon")}</h1>

            <div className="relative w-24 h-24 mb-8 mx-auto">
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>

            <p className="text-xl mb-8">
              {t("player_coming_soon", {
                title: content.title,
                type: content.type === "movie" ? t("movie") : content.type === "series" ? t("series") : t("anime"),
              })}
            </p>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => router.back()}>
              {t("back_to_details")}
            </Button>
          </motion.div>
        </div>
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
    image: "/oppenx.jpeg",
    rating: 8.2,
    episodes: 1,
    genre: "Drama",
    type: "movie",
  },
]

const seriesItems = [
  {
    id: 101,
    title: "The Last of Us",
    image: "/thelastofusx.jpg",
    rating: 8.7,
    episodes: 7,
    genre: "Drama",
    type: "series",
  },
]

const animeItems = [
  {
    id: 201,
    title: "Attack on Titan",
    image: "/titanx.jpeg",
    rating: 9.0,
    episodes: 25,
    genre: "Ação",
    type: "anime",
  },
]

