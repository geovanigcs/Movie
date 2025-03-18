"use client"

import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlayIcon, StarIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function CompletedPage() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("completed")}</h1>
        <p className="text-muted-foreground">{t("content_you_have_finished")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {completedItems.map((item, index) => (
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
                  <div className="flex items-center gap-1 bg-background/50 rounded-full px-2 py-1">
                    <StarIcon size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{item.userRating}</span>
                  </div>
                </div>
                {item.completed && (
                  <div className="absolute top-2 left-2">
                    <div className="bg-primary/80 text-primary-foreground text-xs font-medium rounded-full px-2 py-1">
                      {t("completed")}
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="text-yellow-400">★ {item.rating}</span>
                  <span>•</span>
                  <span>{item.completedDate}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  <PlayIcon size={16} />
                  {t("watch_again")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  )
}

const completedItems = [
  {
    id: 1,
    title: "Breaking Bad",
    image: "/breaking.jpg",
    rating: 9.5,
    userRating: 9.8,
    completedDate: "2025-01-15",
    completed: true,
  },
  {
    id: 2,
    title: "Inception",
    image: "/inception.jpeg",
    rating: 8.8,
    userRating: 9.0,
    completedDate: "2025-02-10",
    completed: true,
  },
]

