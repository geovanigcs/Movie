"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useTranslation } from "@/components/language-provider"
import { motion } from "framer-motion"

export function GenreSection() {
  const { t } = useTranslation()

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{t("genres")}</h2>
        <Link href="#" className="flex items-center text-sm text-primary hover:underline">
          {t("view_more")} <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/genre/${genre.id}`}>
              <div className="group relative h-40 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                <img
                  src={genre?.image || "/placeholder.svg?height=160&width=300"}
                  alt={genre.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-2xl font-bold text-white">{t(genre.name.toLowerCase())}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const genres = [
  { id: 1, name: "Drama", image: "/drama.jpg"},
  { id: 2, name: "Comedy", image: "/comedy.jpg"},
  { id: 3, name: "Action", image: "/action.jpg"},
  { id: 4, name: "Horror", image: "/horror.jpeg"},
  { id: 5, name: "Fantasy", image: "/fantasy.jpg" },
  { id: 6, name: "Superhero", image: "/hero.jpg"},
  { id: 7, name: "Romance", image: "/romance.jpg"},
  { id: 8, name: "Sci-Fi", image: "/sfi.jpg"},
]

