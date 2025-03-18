"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, ChevronDown, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { useTranslation } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function AppHeader() {
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const { t, setLanguage, language } = useTranslation()
  const { toast } = useToast()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    toast({
      title: t("language_changed"),
      description:
        t("language_changed_to") +
        " " +
        (lang === "en"
          ? "English"
          : lang === "pt"
            ? "Português"
            : lang === "es"
              ? "Español"
              : lang === "ru"
                ? "Русский"
                : ""),
    })
  }

  const handleUserChange = (user: string) => {
    toast({
      title: t("user_changed"),
      description: t("switched_to") + " " + user,
    })
    setShowUserMenu(false)
  }

  return (
    <header className="border-b border-blue-950/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="hidden md:flex"
          >
            <nav className="flex items-center gap-6">
              <Link href="/movies" className="text-sm font-medium transition-colors hover:text-primary">
                {t("movies")}
              </Link>
              <Link href="/series" className="text-sm font-medium transition-colors hover:text-primary">
                {t("series")}
              </Link>
              <Link href="/anime" className="text-sm font-medium transition-colors hover:text-primary">
                {t("anime")}
              </Link>
            </nav>
          </motion.div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("search")}
              className="w-full bg-background pl-8 md:w-[300px] rounded-full"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {language === "pt"
                  ? "🇧🇷"
                  : language === "en"
                    ? "🇺🇸"
                    : language === "es"
                      ? "🇪🇸"
                      : language === "ru"
                        ? "🇷🇺"
                        : "🇧🇷"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange("pt")}>🇧🇷 Português</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>🇺🇸 English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("es")}>🇪🇸 Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("ru")}>🇷🇺 Русский</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="rounded-full"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-80 rounded-md border border-blue-950/30 bg-card p-4 shadow-lg"
                >
                  <h3 className="mb-2 font-medium">{t("notifications")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-md p-2 hover:bg-muted">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">🎬</div>
                      <div>
                        <p className="text-sm font-medium">{t("new_release")}</p>
                        <p className="text-xs text-muted-foreground">{t("dune_part_2_arrived")}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t("now")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-md p-2 hover:bg-muted">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">🏆</div>
                      <div>
                        <p className="text-sm font-medium">{t("series_completed")}</p>
                        <p className="text-xs text-muted-foreground">{t("last_of_us_season_1_completed")}</p>
                        <p className="text-xs text-muted-foreground mt-1">2h {t("ago")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-md p-2 hover:bg-muted">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">⭐</div>
                      <div>
                        <p className="text-sm font-medium">{t("recommendation")}</p>
                        <p className="text-xs text-muted-foreground">{t("based_on_history_oppenheimer")}</p>
                        <p className="text-xs text-muted-foreground mt-1">5h {t("ago")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <Button variant="link" size="sm" className="text-xs">
                      {t("view_all_notifications")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/Samantha.jpg" alt="User" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">Samantha</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-56 rounded-md border border-blue-950/30 bg-card p-1 shadow-lg"
                >
                  <div className="p-2 text-sm font-medium">{t("switch_user")}</div>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => handleUserChange("Samantha")}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/Samantha.jpg" alt="User" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <span>Samantha</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => handleUserChange("Carlos")}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/Carlos.jpg" alt="User" />

                        <AvatarFallback>CR</AvatarFallback>
                      </Avatar>
                      <span>Carlos</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => handleUserChange("Julia")}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/Julia.jpg" alt="User" />
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                      <span>Julia</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => handleUserChange("Miguel")}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/Miguel.jpg" alt="User" />
                        <AvatarFallback>MG</AvatarFallback>
                      </Avatar>
                      <span>Miguel</span>
                    </Button>
                  </div>
                  <div className="mt-2 border-t border-blue-950/30 pt-2">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/settings")}>
                      {t("settings")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive"
                      onClick={() => {
                        toast({
                          title: t("coming_soon"),
                          description: t("login_feature_coming_soon"),
                        })
                        setShowUserMenu(false)
                      }}
                    >
                      {t("logout")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

