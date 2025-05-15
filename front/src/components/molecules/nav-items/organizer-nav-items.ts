// components/molecules/nav-items/speaker-nav-items.ts
import { LayoutDashboard, MessageSquare ,Users, Calendar,Settings} from "lucide-react"

export const organizerNavItems = [
    { href: "/organizer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/organizer/submissions", label: "Submissions", icon: MessageSquare },
    { href: "/organizer/schedule", label: "Schedule", icon: Calendar },
    { href: "/organizer/speakers", label: "Speakers", icon: Users },
    { href: "/organizer/settings", label: "Settings", icon: Settings },
  ]
