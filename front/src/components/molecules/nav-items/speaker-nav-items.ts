// components/molecules/nav-items/speaker-nav-items.ts
import { LayoutDashboard, MessageSquare, Calendar, Settings } from "lucide-react"

export const speakerNavItems = [
  { href: "/speaker", label: "Dashboard", icon: LayoutDashboard },
  { href: "/speaker/talks", label: "My Talks", icon: MessageSquare },
  { href: "/speaker/schedule", label: "My Schedule", icon: Calendar },
  { href: "/speaker/settings", label: "Settings", icon: Settings },
]
