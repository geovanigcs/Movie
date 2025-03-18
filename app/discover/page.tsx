"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayIcon, PlusIcon, RefreshCwIcon, ThumbsUpIcon, ThumbsDownIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function DiscoverPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [currentContent, setCurrentContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [contentType, setContentType] = useState<"all" | "movie" | "series" | "anime">("all")

  const getRandomContent = () => {
    setLoading(true)

    let availableContent: string | any[] = []
    if (contentType === "all") {
      availableContent = [...movieItems, ...seriesItems, ...animeItems]
    } else if (contentType === "movie") {
      availableContent = movieItems
    } else if (contentType === "series") {
      availableContent = seriesItems
    } else if (contentType === "anime") {
      availableContent = animeItems
    }

    const randomIndex = Math.floor(Math.random() * availableContent.length)
    const randomContent = availableContent[randomIndex]

    setTimeout(() => {
      setCurrentContent(randomContent)
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    getRandomContent()
  }, [contentType])

  const handleAddToWatchlist = () => {
    toast({
      title: t("added_to_watchlist"),
      description: `${currentContent?.title} ${t("added_to_your_watchlist")}`,
    })
  }

  const handleLike = () => {
    toast({
      title: t("liked"),
      description: t("we_will_recommend_similar_content"),
    })
    getRandomContent()
  }

  const handleDislike = () => {
    toast({
      title: t("disliked"),
      description: t("we_wont_recommend_similar_content"),
    })
    getRandomContent()
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("discover")}</h1>
        <p className="text-muted-foreground">{t("discover_new_content")}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={contentType === "all" ? "default" : "outline"}
          onClick={() => setContentType("all")}
          className="rounded-full"
        >
          {t("all")}
        </Button>
        <Button
          variant={contentType === "movie" ? "default" : "outline"}
          onClick={() => setContentType("movie")}
          className="rounded-full"
        >
          {t("movies")}
        </Button>
        <Button
          variant={contentType === "series" ? "default" : "outline"}
          onClick={() => setContentType("series")}
          className="rounded-full"
        >
          {t("series")}
        </Button>
        <Button
          variant={contentType === "anime" ? "default" : "outline"}
          onClick={() => setContentType("anime")}
          className="rounded-full"
        >
          {t("anime")}
        </Button>
      </div>

      <div className="flex justify-center w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-[60vh] w-full"
            >
              <div className="flex flex-col items-center">
                <RefreshCwIcon className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-lg">{t("finding_something_for_you")}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="relative aspect-video">
                  <img
                    src={currentContent?.image || "/placeholder.svg?height=600&width=1000"}
                    alt={currentContent?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{currentContent?.title}</h2>

                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-md font-medium">
                        {currentContent?.rating} ★
                      </span>
                      {currentContent?.year && <span>{currentContent.year}</span>}
                      {currentContent?.episodes > 1 && (
                        <span>
                          {currentContent.episodes} {t("episodes")}
                        </span>
                      )}
                      <span>{currentContent?.genre}</span>
                      <span>
                        {currentContent?.type === "movie"
                          ? t("movie")
                          : currentContent?.type === "series"
                            ? t("series")
                            : t("anime")}
                      </span>
                    </div>

                    <p className="text-base md:text-lg text-gray-350 mb-6 line-clamp-3">
                      {currentContent?.description || t("sample_description")}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 justify-between">
                    <div className="flex flex-wrap gap-4">
                      <Link href={`/details/${currentContent?.id}`}>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                          <PlayIcon size={18} />
                          {t("watch_now")}
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline" className="gap-2" onClick={handleAddToWatchlist}>
                        <PlusIcon size={18} />
                        {t("add_to_watchlist")}
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button size="lg" variant="outline" className="rounded-full h-12 w-12 p-0" onClick={handleLike}>
                        <ThumbsUpIcon size={18} />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full h-12 w-12 p-0"
                        onClick={handleDislike}
                      >
                        <ThumbsDownIcon size={18} />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full h-12 w-12 p-0"
                        onClick={getRandomContent}
                      >
                        <RefreshCwIcon size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
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
    year: "2024",
    genre: "Ficção Científica",
    type: "movie",
    description:
      "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele deve impedir um futuro terrível que só ele pode prever.",
  },
  {
    id: 2,
    title: "Oppenheimer",
    image: "/oppenheimer.jpeg",
    rating: 8.2,
    episodes: 1,
    year: "2023",
    genre: "Drama",
    type: "movie",
    description:
      "A história do cientista americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.",
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    image: "/deadewolve.jpg",
    rating: 7.9,
    episodes: 1,
    year: "2024",
    genre: "Ação",
    type: "movie",
    description:
      "Deadpool precisa convencer um relutante Wolverine a se juntar a ele em uma missão que pode alterar o curso do Multiverso Marvel para sempre.",
  },
  {
    id: 4,
    title: "Coringa: Delírio a Dois",
    image: "/coringax.jpeg",
    rating: 7.5,
    episodes: 1,
    year: "2024",
    genre: "Crime",
    type: "movie",
    description:
      "Arthur Fleck, agora internado no Asilo Arkham, encontra seu verdadeiro amor, Harley Quinn, enquanto enfrenta julgamento pelos crimes que cometeu como Coringa.",
  },
  {
    id: 5,
    title: "Gladiador 2",
    image: "/gladiador.jpg",
    rating: 8.0,
    episodes: 1,
    year: "2024",
    genre: "Ação",
    type: "movie",
    description:
      "Anos após a morte de Maximus, um novo herói surge em Roma para desafiar a corrupção do império e honrar o legado do lendário gladiador.",
  },
]

const seriesItems = [
  {
    id: 101,
    title: "The Last of Us",
    image: "/thelastofusx.jpg",
    rating: 8.7,
    episodes: 9,
    year: "2023",
    genre: "Drama",
    type: "series",
    description:
      "Vinte anos após a queda da civilização, Joel é contratado para tirar Ellie de uma zona de quarentena opressiva. O que começa como um pequeno trabalho logo se torna uma jornada brutal e dolorosa.",
  },
  {
    id: 102,
    title: "House of the Dragon",
    image: "/dragonx.jpg",
    rating: 8.4,
    episodes: 10,
    year: "2022",
    genre: "Fantasia",
    type: "series",
    description:
      "A história da Casa Targaryen se passa 200 anos antes dos eventos de Game of Thrones, contando a guerra civil conhecida como 'Dança dos Dragões'.",
  },
  {
    id: 103,
    title: "Stranger Things",
    image: "/stranger.jpg",
    rating: 8.6,
    episodes: 34,
    year: "2016",
    genre: "Sci-Fi",
    type: "series",
    description:
      "Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais aterrorizantes e uma garotinha muito estranha.",
  },
  {
    id: 104,
    title: "The Crown",
    image: "/thecrown.jpeg",
    rating: 8.3,
    episodes: 60,
    year: "2016",
    genre: "Drama",
    type: "series",
    description:
      "Acompanha a vida da Rainha Elizabeth II desde sua juventude até os dias atuais, explorando os eventos políticos e pessoais que moldaram seu reinado.",
  },
  {
    id: 105,
    title: "The Boys",
    image: "/theboys.jpeg",
    rating: 8.5,
    episodes: 24,
    year: "2019",
    genre: "Ação",
    type: "series",
    description:
      "Em um mundo onde super-heróis são tratados como celebridades e se corromperam com o poder, um grupo de vigilantes conhecidos como 'The Boys' se propõe a expor a verdade sobre os Sete e a Vought.",
  },
]

const animeItems = [
  {
    id: 201,
    title: "Attack on Titan",
    image: "/titanx.jpeg",
    rating: 9.0,
    episodes: 87,
    year: "2013",
    genre: "Ação",
    type: "anime",
    description:
      "Em um mundo onde a humanidade vive dentro de cidades cercadas por enormes muralhas devido à ameaça dos Titãs, gigantes devoradores de humanos, Eren Yeager jura vingança após um Titã destruir sua cidade e matar sua mãe.",
  },
  {
    id: 202,
    title: "Demon Slayer",
    image: "/kimetsux.jpg",
    rating: 8.7,
    episodes: 44,
    year: "2019",
    genre: "Ação",
    type: "anime",
    description:
      "Tanjiro Kamado, um jovem que vende carvão, descobre que sua família foi massacrada por um demônio. Para piorar, sua irmã mais nova, Nezuko, foi transformada em um demônio. Determinado a curar sua irmã, ele se torna um caçador de demônios.",
  },
  {
    id: 203,
    title: "Jujutsu Kaisen",
    image: "/jujutsu.jpg",
    rating: 8.6,
    episodes: 36,
    year: "2020",
    genre: "Ação",
    type: "anime",
    description:
      "Yuji Itadori, um estudante do ensino médio com habilidades físicas excepcionais, se junta a uma organização secreta de feiticeiros para eliminar uma poderosa maldição após ingerir um objeto amaldiçoado para salvar seus amigos.",
  },
  {
    id: 204,
    title: "One Piece",
    image: "/onepiecex.jpeg",
    rating: 8.9,
    episodes: 1000,
    year: "1999",
    genre: "Aventura",
    type: "anime",
    description:
      "Monkey D. Luffy e sua tripulação de piratas exploram o Grand Line em busca do tesouro mais cobiçado do mundo, o 'One Piece', para se tornar o próximo Rei dos Piratas.",
  },
  {
    id: 205,
    title: "My Hero Academia",
    image: "/boku.jpeg",
    rating: 8.4,
    episodes: 113,
    year: "2016",
    genre: "Ação",
    type: "anime",
    description:
      "Em um mundo onde quase toda a população possui superpoderes, Izuku Midoriya, um garoto sem poderes, herda a habilidade do maior herói do mundo e entra para a academia de heróis mais prestigiada do Japão.",
  },
]

