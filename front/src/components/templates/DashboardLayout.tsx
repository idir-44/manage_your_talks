import type { ReactNode } from "react"
import { useLocation, Link } from "@tanstack/react-router"
import { Calendar, Home, LayoutDashboard, Menu, MessageSquare, Settings, Users } from "lucide-react"

import { Button } from "@/components/atoms/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/molecules/sheet"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/atoms/mode-toggle"
import { UserNav } from "@/components/organisms/user-nav"
import { useAuth } from "@/components/templates/auth-provider"

import { speakerNavItems } from "@/components/molecules/nav-items/speaker-nav-items"
import { organizerNavItems } from "@/components/molecules/nav-items/organizer-nav-items"
import { publicNavItems } from "@/components/molecules/nav-items/public-nav-items"

interface DashboardLayoutProps {
  children: ReactNode
  role: "speaker" | "organizer" | "public"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useAuth()

  const navItems =
    role === "speaker" ? speakerNavItems :
    role === "organizer" ? organizerNavItems :
    publicNavItems

  const roleTitle =
    role === "speaker" ? "Speaker Dashboard" :
    role === "organizer" ? "Organizer Dashboard" :
    "Public Dashboard"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">TalkMaster</span>
          </Link>
        </div>
        <div className="flex flex-col flex-1 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{roleTitle}</h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", pathname === item.href ? "bg-accent" : "")}
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-auto p-4">
            {role !== "public" && (
              <Button variant="outline" className="w-full justify-start mb-2">
                <Home className="mr-2 h-4 w-4" />
                My Profile
              </Button>
            )}
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6 border-b">
                <Link to="/" className="flex items-center gap-2">
                  <span className="font-bold text-xl">TalkMaster</span>
                </Link>
              </div>
              <div className="flex flex-col flex-1 py-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{roleTitle}</h2>
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={cn("w-full justify-start", pathname === item.href ? "bg-accent" : "")}
                        asChild
                      >
                        <Link to={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mt-auto p-4">
                  {role !== "public" && (
                    <Button variant="outline" className="w-full justify-start mb-2">
                      <Home className="mr-2 h-4 w-4" />
                      My Profile
                    </Button>
                  )}
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <h1 className="text-lg font-semibold">{roleTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            {role === "public" ? (
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Speaker Login</Link>
              </Button>
            ) : (
              <UserNav />
            )}
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
