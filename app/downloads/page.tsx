"use client"

import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlayIcon, TrashIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function DownloadsPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const handleDelete = (title: string) => {
    toast({
      title: t("download_deleted"),
      description: `${title} ${t("has_been_deleted")}`,
    })
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("downloads")}</h1>
        <p className="text-muted-foreground">{t("downloaded_content")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {downloadedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent/0"></div>
                <div className="absolute bottom-2 right-2">
                  <div className="bg-primary/80 text-primary-foreground text-xs font-medium rounded-full px-2 py-1">
                    {item.size}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="text-yellow-400">★ {item.rating}</span>
                  <span>•</span>
                  <span>{item.type === "movie" ? t("movie") : item.type === "series" ? t("series") : t("anime")}</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {t("downloaded_on")}: {item.downloadDate}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                  <PlayIcon size={16} />
                  {t("watch")}
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleDelete(item.title)}>
                  <TrashIcon size={16} />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  )
}

const downloadedItems = [
  {
    id: 1,
    title: "Duna: Parte 2",
    image: "/Duna2.jpeg",
    rating: 8.5,
    type: "movie",
    size: "4.2 GB",
    downloadDate: "2025-03-15",
  },
  {
    id: 2,
    title: "Attack on Titan",
    image: "/attackontitan.jpeg",
    rating: 9.0,
    type: "anime",
    size: "720 MB",
    downloadDate: "2025-03-10",
  },
]

