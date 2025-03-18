"use client"

import { AppLayout } from "@/components/app-layout"
import { useTranslation } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Construction } from "lucide-react"

export default function CelebritiesPage() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <motion.div
        className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Construction className="w-24 h-24 text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-primary">{t("under_construction")}</h1>
        <p className="text-xl text-muted-foreground max-w-md">{t("celebrities_coming_soon")}</p>
      </motion.div>
    </AppLayout>
  )
}

