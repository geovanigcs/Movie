"use client"

import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayIcon, PlusIcon, TrashIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function PlaylistsPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const handleDelete = (name: string) => {
    toast({
      title: t("playlist_deleted"),
      description: `${name} ${t("has_been_deleted")}`,
    })
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("my_playlists")}</h1>
        <p className="text-muted-foreground">{t("manage_your_playlists")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="relative h-40">
                <img
                  src={playlist.image || "/placeholder.svg"}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <Button size="sm" variant="default" className="h-8 w-8 p-0">
                    <PlayIcon size={16} />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{playlist.name}</CardTitle>
                <CardDescription>
                  {playlist.items} {t("items")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("last_updated")}: {playlist.lastUpdated}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => handleDelete(playlist.name)}>
                  <TrashIcon size={16} className="mr-2" />
                  {t("delete")}
                </Button>
                <Button variant="outline" size="sm">
                  <PlusIcon size={16} className="mr-2" />
                  {t("add_content")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        {/* Add new playlist card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: playlists.length * 0.1 }}
        >
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-dashed border-primary/20 flex flex-col items-center justify-center h-full min-h-[300px]">
            <CardContent className="flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PlusIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{t("create_new_playlist")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("organize_your_favorite_content")}</p>
              <Button variant="outline">{t("create_playlist")}</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  )
}

const playlists = [
  {
    id: 1,
    name: "Favoritos",
    items: 12,
    lastUpdated: "2025-03-15",
    image: "/breakingx.jpg",
  },
  {
    id: 2,
    name: "Para assistir depois",
    items: 8,
    lastUpdated: "2025-03-10",
    image: "/onepiecex.jpeg",
  },
  {
    id: 3,
    name: "Ficção Científica",
    items: 15,
    lastUpdated: "2025-03-05",
    image: "/interx.jpg",
  },
  {
    id: 4,
    name: "Animes",
    items: 20,
    lastUpdated: "2025-03-01",
    image: "/kimetsux.jpg",
  },
  {
    id: 5,
    name: "Concluídos",
    items: 32,
    lastUpdated: "2025-02-28",
    image: "/coringax.jpeg",
  },
]

