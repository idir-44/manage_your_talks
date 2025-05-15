"use client"

import { useState } from "react"
import { Bell, Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Button } from "@/components/atoms/button"
import { cn } from "@/lib/utils"

// Sample notifications data
const initialNotifications = [
  {
    id: "notif1",
    title: "Talk Accepted",
    message: "Your talk 'Next.js 15: The Future of React Applications' has been accepted!",
    type: "success",
    date: "2025-04-20T10:15:00Z",
    read: false,
  },
  {
    id: "notif2",
    title: "Talk Scheduled",
    message:
      "Your talk 'Next.js 15: The Future of React Applications' has been scheduled for May 15, 2025 at 9:00 AM in the Theater.",
    type: "info",
    date: "2025-04-25T14:30:00Z",
    read: false,
  },
  {
    id: "notif3",
    title: "Talk Rejected",
    message:
      "Unfortunately, your talk 'State Management in React' was not selected for this event. Feedback: Similar topic already accepted from another speaker.",
    type: "error",
    date: "2025-04-15T09:45:00Z",
    read: true,
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [expanded, setExpanded] = useState(true)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // If no notifications, don't render the component
  if (notifications.length === 0) {
    return null
  }

  return (
    <Card className="border-primary/10 bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="h-5 w-5 text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <CardTitle>Notifications</CardTitle>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs hover:bg-primary/5 hover:text-primary"
              >
                Mark all as read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-xs hover:bg-primary/5 hover:text-primary"
            >
              {expanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
        <CardDescription>Updates about your talk submissions and event information</CardDescription>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "relative rounded-lg p-4 transition-colors",
                notification.read
                  ? "bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                  : "bg-white dark:bg-slate-900 border shadow-sm",
                notification.type === "success" && "border-l-4 border-l-emerald-500",
                notification.type === "error" && "border-l-4 border-l-rose-500",
                notification.type === "info" && "border-l-4 border-l-cyan-500",
              )}
            >
              <div className="flex justify-between">
                <h4 className="font-medium">{notification.title}</h4>
                <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
              <div className="mt-3 flex justify-end gap-2">
                {!notification.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Mark as read
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => dismissNotification(notification.id)}
                >
                  <X className="mr-1 h-3 w-3" />
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  )
}
