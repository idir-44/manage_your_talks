"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/molecules/dialog"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar"

// Sample data for the agenda
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
]

const rooms = [
  { id: "main", name: "Main Hall" },
  { id: "workshop", name: "Workshop Room" },
  { id: "theater", name: "Theater" },
  { id: "blue", name: "Blue Room" },
  { id: "green", name: "Green Room" },
]

// Level colors
const levelColors = {
  beginner:
    "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-400",
  intermediate:
    "border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/50 dark:text-amber-400",
  advanced: "border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-400",
}

// Topic colors
const topicColors = {
  react: "border-cyan-500 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-950/50 dark:text-cyan-400",
  nextjs:
    "border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-400",
  typescript: "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-950/50 dark:text-blue-400",
  ai: "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-950/50 dark:text-fuchsia-400",
  cloud: "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-950/50 dark:text-sky-400",
  devops:
    "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-950/50 dark:text-orange-400",
  security: "border-red-500 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-950/50 dark:text-red-400",
  mobile:
    "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-400",
}

// Sample talks data
const talks = [
  {
    id: "talk1",
    title: "Building Modern UIs with React 18",
    description:
      "Learn about the latest features in React 18 and how to use them to build modern, performant user interfaces.",
    speaker: {
      id: "speaker1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Senior Frontend Developer at TechCorp with 8 years of React experience.",
    },
    room: "main",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    date: "2025-05-15",
    topic: "react",
    level: "intermediate",
    duration: 60,
  },
  {
    id: "talk2",
    title: "Next.js 15: The Future of React Applications",
    description: "Explore the new features in Next.js 15 and how they can improve your development workflow.",
    speaker: {
      id: "speaker2",
      name: "Samantha Lee",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Full Stack Developer and open source contributor to Next.js.",
    },
    room: "theater",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    date: "2025-05-15",
    topic: "nextjs",
    level: "beginner",
    duration: 90,
  },
  {
    id: "talk3",
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into advanced TypeScript patterns and how to leverage the type system for safer code.",
    speaker: {
      id: "speaker3",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "TypeScript expert and author of 'Mastering TypeScript'.",
    },
    room: "workshop",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    date: "2025-05-15",
    topic: "typescript",
    level: "advanced",
    duration: 120,
  },
  {
    id: "talk4",
    title: "Building AI-Powered Applications",
    description: "Learn how to integrate AI capabilities into your web applications using modern frameworks.",
    speaker: {
      id: "speaker4",
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "AI Engineer and consultant specializing in practical applications of machine learning.",
    },
    room: "blue",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    date: "2025-05-15",
    topic: "ai",
    level: "intermediate",
    duration: 90,
  },
  {
    id: "talk5",
    title: "Cloud-Native Development with Kubernetes",
    description: "Explore best practices for developing and deploying applications in a cloud-native environment.",
    speaker: {
      id: "speaker5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Cloud architect with expertise in Kubernetes and containerization.",
    },
    room: "green",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    date: "2025-05-15",
    topic: "cloud",
    level: "advanced",
    duration: 120,
  },
  {
    id: "talk6",
    title: "DevOps for Frontend Developers",
    description: "Learn essential DevOps practices that every frontend developer should know.",
    speaker: {
      id: "speaker6",
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "DevOps engineer with a background in frontend development.",
    },
    room: "main",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    date: "2025-05-15",
    topic: "devops",
    level: "beginner",
    duration: 60,
  },
  {
    id: "talk7",
    title: "Web Security Fundamentals",
    description: "Understand common security vulnerabilities and how to protect your web applications.",
    speaker: {
      id: "speaker7",
      name: "James Kim",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Security consultant specializing in web application security.",
    },
    room: "theater",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    date: "2025-05-15",
    topic: "security",
    level: "intermediate",
    duration: 90,
  },
  {
    id: "talk8",
    title: "React Native: One Codebase, Multiple Platforms",
    description: "Build mobile applications for iOS and Android using your React skills.",
    speaker: {
      id: "speaker8",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Mobile developer with 5 years of experience in React Native.",
    },
    room: "blue",
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    date: "2025-05-15",
    topic: "mobile",
    level: "beginner",
    duration: 60,
  },
  {
    id: "talk9",
    title: "Serverless Architecture Patterns",
    description: "Explore different patterns for building serverless applications and their trade-offs.",
    speaker: {
      id: "speaker9",
      name: "Ryan Thompson",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Cloud solutions architect specializing in serverless technologies.",
    },
    room: "green",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    date: "2025-05-15",
    topic: "cloud",
    level: "intermediate",
    duration: 90,
  },
  {
    id: "talk10",
    title: "State Management in React",
    description: "Compare different state management solutions in React and when to use each one.",
    speaker: {
      id: "speaker10",
      name: "Sophia Wang",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Frontend architect with expertise in React and state management.",
    },
    room: "main",
    startTime: "1:00 PM",
    endTime: "2:00 PM",
    date: "2025-05-15",
    topic: "react",
    level: "intermediate",
    duration: 60,
  },
  {
    id: "talk11",
    title: "Building Accessible Web Applications",
    description: "Learn how to make your web applications accessible to all users.",
    speaker: {
      id: "speaker11",
      name: "Thomas Brown",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Accessibility advocate and frontend developer.",
    },
    room: "theater",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    date: "2025-05-15",
    topic: "react",
    level: "beginner",
    duration: 90,
  },
  {
    id: "talk12",
    title: "GraphQL: A New Way to API",
    description: "Understand the benefits of GraphQL and how to implement it in your applications.",
    speaker: {
      id: "speaker12",
      name: "Natalie Garcia",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Backend developer specializing in API design and GraphQL.",
    },
    room: "workshop",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    date: "2025-05-15",
    topic: "nextjs",
    level: "intermediate",
    duration: 120,
  },
  {
    id: "talk13",
    title: "Machine Learning for Web Developers",
    description: "Introduction to machine learning concepts for web developers with practical examples.",
    speaker: {
      id: "speaker13",
      name: "Daniel Lee",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Web developer with a passion for machine learning and AI.",
    },
    room: "blue",
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    date: "2025-05-15",
    topic: "ai",
    level: "beginner",
    duration: 90,
  },
  {
    id: "talk14",
    title: "Microservices Architecture",
    description: "Learn about microservices architecture and how to implement it effectively.",
    speaker: {
      id: "speaker14",
      name: "Jennifer White",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Software architect with expertise in distributed systems.",
    },
    room: "green",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    date: "2025-05-15",
    topic: "devops",
    level: "advanced",
    duration: 120,
  },
  {
    id: "talk15",
    title: "Performance Optimization in React",
    description: "Techniques and tools for optimizing the performance of your React applications.",
    speaker: {
      id: "speaker15",
      name: "Christopher Davis",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Performance engineer specializing in frontend optimization.",
    },
    room: "main",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    date: "2025-05-15",
    topic: "react",
    level: "advanced",
    duration: 60,
  },
  {
    id: "talk16",
    title: "Building Progressive Web Apps",
    description: "Learn how to transform your web application into a Progressive Web App.",
    speaker: {
      id: "speaker16",
      name: "Michelle Taylor",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Frontend developer specializing in PWAs and offline-first applications.",
    },
    room: "theater",
    startTime: "4:00 PM",
    endTime: "5:30 PM",
    date: "2025-05-15",
    topic: "mobile",
    level: "intermediate",
    duration: 90,
  },
  {
    id: "talk17",
    title: "Securing Your API",
    description: "Best practices for securing your API endpoints and protecting user data.",
    speaker: {
      id: "speaker17",
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Security engineer with a focus on API security.",
    },
    room: "workshop",
    startTime: "5:00 PM",
    endTime: "6:30 PM",
    date: "2025-05-15",
    topic: "security",
    level: "intermediate",
    duration: 90,
  },
  {
    id: "talk18",
    title: "The Future of Frontend Development",
    description: "Explore emerging trends and technologies in frontend development.",
    speaker: {
      id: "speaker18",
      name: "Lisa Anderson",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Technology evangelist and frontend development thought leader.",
    },
    room: "main",
    startTime: "6:00 PM",
    endTime: "7:00 PM",
    date: "2025-05-15",
    topic: "nextjs",
    level: "beginner",
    duration: 60,
  },
]

interface PublicAgendaProps {
  date: string
  topicFilters: string[]
  roomFilters: string[]
  levelFilters: string[]
  favorites: string[]
  onToggleFavorite: (talkId: string) => void
}

export function PublicAgenda({
  date,
  topicFilters,
  roomFilters,
  levelFilters,
  favorites,
  onToggleFavorite,
}: PublicAgendaProps) {
  const [selectedTalk, setSelectedTalk] = useState<(typeof talks)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Filter talks based on selected filters
  const filteredTalks = talks.filter((talk) => {
    const matchesDate = talk.date === date
    const matchesTopic = topicFilters.length === 0 || topicFilters.includes(talk.topic)
    const matchesRoom = roomFilters.length === 0 || roomFilters.includes(talk.room)
    const matchesLevel = levelFilters.length === 0 || levelFilters.includes(talk.level)

    return matchesDate && matchesTopic && matchesRoom && matchesLevel
  })

  const handleTalkClick = (talk: (typeof talks)[0]) => {
    setSelectedTalk(talk)
    setDialogOpen(true)
  }

  // Function to get talks for a specific time slot and room
  const getTalkForTimeAndRoom = (time: string, roomId: string) => {
    return filteredTalks.find((talk) => talk.startTime === time && talk.room === roomId)
  }

  // Function to calculate the row span for a talk based on its duration
  const calculateRowSpan = (talk: (typeof talks)[0]) => {
    const startIndex = timeSlots.indexOf(talk.startTime)
    const endIndex = timeSlots.indexOf(talk.endTime)
    return endIndex - startIndex
  }

  // Function to check if a cell should be rendered or is part of a rowspan
  const shouldRenderCell = (time: string, roomId: string) => {
    const talk = getTalkForTimeAndRoom(time, roomId)
    if (!talk) return true

    const currentIndex = timeSlots.indexOf(time)
    const startIndex = timeSlots.indexOf(talk.startTime)

    return currentIndex === startIndex
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b">
                <th className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 text-left font-semibold">
                  Time
                </th>
                {rooms.map((room) => (
                  <th
                    key={room.id}
                    className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 text-left font-semibold"
                  >
                    {room.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr
                  key={time}
                  className={timeIndex % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/50 dark:bg-slate-900/30"}
                >
                  <td className="border-r p-3 align-top font-medium text-muted-foreground">{time}</td>
                  {rooms.map((room) => {
                    if (!shouldRenderCell(time, room.id)) {
                      return null
                    }

                    const talk = getTalkForTimeAndRoom(time, room.id)
                    const rowSpan = talk ? calculateRowSpan(talk) : 1

                    return (
                      <td key={`${time}-${room.id}`} className="border-b p-2 align-top" rowSpan={rowSpan}>
                        {talk ? (
                          <Card
                            className={cn(
                              "h-full cursor-pointer transition-all hover:shadow-md group",
                              favorites.includes(talk.id)
                                ? "shadow-md border-amber-400 dark:border-amber-500"
                                : "hover:border-primary/50",
                            )}
                            onClick={() => handleTalkClick(talk)}
                          >
                            <CardContent className="p-3 h-full flex flex-col">
                              <div className="flex justify-between items-start gap-2">
                                <div className="space-y-1">
                                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                    {talk.title}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage
                                        src={talk.speaker.avatar || "/placeholder.svg"}
                                        alt={talk.speaker.name}
                                      />
                                      <AvatarFallback className="text-[10px]">
                                        {talk.speaker.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <p className="text-xs text-muted-foreground">{talk.speaker.name}</p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "h-7 w-7 shrink-0 rounded-full",
                                    favorites.includes(talk.id)
                                      ? "text-amber-500 bg-amber-50 dark:bg-amber-900/20"
                                      : "text-muted-foreground",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onToggleFavorite(talk.id)
                                  }}
                                >
                                  <Star className="h-4 w-4" />
                                  <span className="sr-only">
                                    {favorites.includes(talk.id) ? "Remove from favorites" : "Add to favorites"}
                                  </span>
                                </Button>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                <Badge
                                  className={cn("text-xs border", levelColors[talk.level as keyof typeof levelColors])}
                                >
                                  {talk.level.charAt(0).toUpperCase() + talk.level.slice(1)}
                                </Badge>
                                <Badge
                                  className={cn("text-xs border", topicColors[talk.topic as keyof typeof topicColors])}
                                >
                                  {talk.topic.charAt(0).toUpperCase() + talk.topic.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {talk.duration} min
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <div className="h-full w-full p-3 text-center text-sm italic text-muted-foreground rounded-md border border-dashed">
                            No session
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Talk Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedTalk && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <DialogTitle className="text-xl font-bold">{selectedTalk.title}</DialogTitle>
                    <DialogDescription className="text-base font-medium">
                      {selectedTalk.startTime} - {selectedTalk.endTime} |{" "}
                      {rooms.find((r) => r.id === selectedTalk.room)?.name}
                    </DialogDescription>
                  </div>
                  <Button
                    variant={favorites.includes(selectedTalk.id) ? "secondary" : "outline"}
                    size="sm"
                    className={
                      favorites.includes(selectedTalk.id)
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30 border border-amber-300 dark:border-amber-700"
                        : ""
                    }
                    onClick={() => onToggleFavorite(selectedTalk.id)}
                  >
                    <Star className={cn("mr-1 h-4 w-4", favorites.includes(selectedTalk.id) ? "fill-current" : "")} />
                    {favorites.includes(selectedTalk.id) ? "Favorited" : "Add to Favorites"}
                  </Button>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn("border", levelColors[selectedTalk.level as keyof typeof levelColors])}>
                    {selectedTalk.level.charAt(0).toUpperCase() + selectedTalk.level.slice(1)}
                  </Badge>
                  <Badge className={cn("border", topicColors[selectedTalk.topic as keyof typeof topicColors])}>
                    {selectedTalk.topic.charAt(0).toUpperCase() + selectedTalk.topic.slice(1)}
                  </Badge>
                  <Badge variant="outline">{selectedTalk.duration} min</Badge>
                </div>
                <p className="text-muted-foreground">{selectedTalk.description}</p>
                <div className="flex items-start space-x-4 rounded-lg border p-4 bg-card/50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedTalk.speaker.avatar || "/placeholder.svg"}
                      alt={selectedTalk.speaker.name}
                    />
                    <AvatarFallback>
                      {selectedTalk.speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedTalk.speaker.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedTalk.speaker.bio}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
