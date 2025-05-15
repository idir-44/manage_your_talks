// components/molecules/nav-items/speaker-nav-items.ts
import { LayoutDashboard, Users, Calendar} from "lucide-react"

export const publicNavItems = [
    { href: "/public", label: "Dashboard", icon: LayoutDashboard },
    { href: "/public/events", label: "Events", icon: Calendar },
    { href: "/public/speakers", label: "Speakers", icon: Users },
    { href: "/public/schedule", label: "Schedule", icon: Calendar },
  ]
