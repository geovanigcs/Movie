"use client"

import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlayIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useWatchlist } from "@/components/watchlist-provider"
import { useRouter } from "next/navigation"

export default function WatchlistPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { watchlist, removeFromWatchlist, count } = useWatchlist()

  const handleRemove = (id: number, title: string) => {
    removeFromWatchlist(id)
  }

  const handlePlay = (id: number) => {
    router.push(`/player/${id}`)
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{t("my_watchlist")}</h1>
          <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {count} {count === 1 ? t("item") : t("items")}
          </div>
        </div>
        <p className="text-muted-foreground">{t("content_you_want_to_watch")}</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <XIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">{t("empty_watchlist")}</h2>
          <p className="text-muted-foreground max-w-md mb-6">{t("empty_watchlist_description")}</p>
          <Button onClick={() => router.push("/")}>{t("browse_content")}</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map((item, index) => (
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
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-background/50 hover:bg-background/80"
                      onClick={() => handleRemove(item.id, item.title)}
                    >
                      <XIcon size={16} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span className="text-yellow-400">★ {item.rating}</span>
                    <span>•</span>
                    <span>
                      {item.type === "movie" ? t("movie") : item.type === "series" ? t("series") : t("anime")}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90" onClick={() => handlePlay(item.id)}>
                    <PlayIcon size={16} />
                    {t("watch_now")}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}

