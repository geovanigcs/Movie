"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Compass,
  Award,
  Users,
  Clock,
  Star,
  Download,
  ListMusic,
  ListTodo,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react"
import { useTranslation } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { motion } from "framer-motion"

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: t("coming_soon"),
      description: t("login_feature_coming_soon"),
    })
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-blue-950/30">
      <SidebarHeader className="p-4">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex items-center gap-2"
        >
          <span className="font-bold text-xl">
            <span className="text-white">GIGIO&apos;S</span>{" "}
            <span className="text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">MOVIES</span>
          </span>
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip={t("home")}>
                  <Link href="/">
                    <Home className="h-5 w-5" />
                    <span>{t("home")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/discover"} tooltip={t("discover")}>
                  <Link href="/discover">
                    <Compass className="h-5 w-5" />
                    <span>{t("discover")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/awards"} tooltip={t("awards")}>
                  <Link href="/awards">
                    <Award className="h-5 w-5" />
                    <span>{t("awards")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/celebrities"} tooltip={t("celebrities")}>
                  <Link href="/celebrities">
                    <Users className="h-5 w-5" />
                    <span>{t("celebrities")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>{t("library")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/recent"} tooltip={t("recent")}>
                  <Link href="/recent">
                    <Clock className="h-5 w-5" />
                    <span>{t("recent")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/top-rated"} tooltip={t("top_rated")}>
                  <Link href="/top-rated">
                    <Star className="h-5 w-5" />
                    <span>{t("top_rated")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/downloads"} tooltip={t("downloads")}>
                  <Link href="/downloads">
                    <Download className="h-5 w-5" />
                    <span>{t("downloads")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/playlists"} tooltip={t("playlists")}>
                  <Link href="/playlists">
                    <ListMusic className="h-5 w-5" />
                    <span>{t("playlists")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/watchlist"} tooltip={t("watchlist")}>
                  <Link href="/watchlist">
                    <ListTodo className="h-5 w-5" />
                    <span>{t("watchlist")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/completed"} tooltip={t("completed")}>
                  <Link href="/completed">
                    <CheckSquare className="h-5 w-5" />
                    <span>{t("completed")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{t("general")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip={t("settings")}>
                  <Link href="/settings">
                    <Settings className="h-5 w-5" />
                    <span>{t("settings")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip={t("logout")}>
                  <LogOut className="h-5 w-5" />
                  <span>{t("logout")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

