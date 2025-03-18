"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ContentCard } from "@/components/content-card"
import { motion } from "framer-motion"

interface ContentSectionProps {
  title: string
  items: any[]
  showProgress?: boolean
}

export function ContentSection({ title, items, showProgress = false }: ContentSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href="#" className="flex items-center text-sm text-primary hover:underline">
          Ver Mais <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ContentCard item={item} showProgress={showProgress} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

