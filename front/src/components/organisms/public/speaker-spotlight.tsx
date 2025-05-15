"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Twitter, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardFooter } from "@/components/atoms/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar"
import { Badge } from "@/components/atoms/badge"
import { cn } from "@/lib/utils"

// Sample speakers data
const speakers = [
  {
    id: "speaker1",
    name: "Alex Johnson",
    role: "Senior Frontend Developer",
    company: "TechCorp",
    bio: "Alex is a senior frontend developer with 8 years of experience in React and modern JavaScript frameworks.",
    avatar: "/placeholder.svg?height=200&width=200",
    topics: ["react", "javascript"],
    social: {
      twitter: "https://twitter.com/alexj",
      github: "https://github.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
    },
    highlight: true,
  },
  {
    id: "speaker2",
    name: "Samantha Lee",
    role: "Full Stack Developer",
    company: "WebSolutions",
    bio: "Samantha is a full stack developer and open source contributor to Next.js and other React-based frameworks.",
    avatar: "/placeholder.svg?height=200&width=200",
    topics: ["nextjs", "react"],
    social: {
      twitter: "https://twitter.com/samlee",
      github: "https://github.com/samlee",
      linkedin: "https://linkedin.com/in/samlee",
    },
    highlight: true,
  },
  // ...other speakers
]

// Topic colors
const topicColors = {
  react: "border-cyan-500 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-950/50 dark:text-cyan-400",
  nextjs:
    "border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-400",
  typescript: "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-950/50 dark:text-blue-400",
  javascript:
    "border-yellow-500 bg-yellow-50 text-yellow-700 dark:border-yellow-500/30 dark:bg-yellow-950/50 dark:text-yellow-400",
  ai: "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-950/50 dark:text-fuchsia-400",
  cloud: "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-950/50 dark:text-sky-400",
  devops:
    "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-950/50 dark:text-orange-400",
  security: "border-red-500 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-950/50 dark:text-red-400",
  mobile:
    "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-400",
}

export function SpeakerSpotlight() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [featuredSpeakers, setFeaturedSpeakers] = useState<typeof speakers>([])
  const [regularSpeakers, setRegularSpeakers] = useState<typeof speakers>([])

  useEffect(() => {
    // Split speakers into featured and regular
    setFeaturedSpeakers(speakers.filter((speaker) => speaker.highlight))
    setRegularSpeakers(speakers.filter((speaker) => !speaker.highlight))
  }, [])

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft)
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : true

  return (
    <div className="space-y-10">
      {/* Featured Speakers Section */}
      {featuredSpeakers.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight relative z-10">Keynote Speakers</h2>
              <div className="absolute -bottom-1 left-0 h-3 w-20 bg-primary/20 rounded-full -z-0"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredSpeakers.map((speaker) => (
              <Card
                key={speaker.id}
                className="overflow-hidden bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Avatar className="h-20 w-20 rounded-xl border-2 border-primary/20">
                      <AvatarImage src={speaker.avatar || "/placeholder.svg"} alt={speaker.name} />
                      <AvatarFallback className="rounded-xl">
                        {speaker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl">{speaker.name}</h3>
                      <p className="text-sm text-primary font-medium">
                        {speaker.role} at {speaker.company}
                      </p>
                      <div className="flex flex-wrap gap-1 my-2">
                        {speaker.topics.map((topic) => (
                          <Badge
                            key={topic}
                            className={cn("text-xs border", topicColors[topic as keyof typeof topicColors])}
                          >
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{speaker.bio}</p>

                      <div className="flex mt-3 gap-2">
                        {speaker.social.twitter && (
                          <a
                            href={speaker.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </a>
                        )}
                        {speaker.social.github && (
                          <a
                            href={speaker.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                          </a>
                        )}
                        {speaker.social.linkedin && (
                          <a
                            href={speaker.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Speakers Carousel */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight relative z-10">All Speakers</h2>
            <div className="absolute -bottom-1 left-0 h-3 w-16 bg-primary/20 rounded-full -z-0"></div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-full border-primary/20"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-full border-primary/20"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
          onScroll={handleScroll}
        >
          {speakers.map((speaker) => (
            <Card
              key={speaker.id}
              className="min-w-[280px] max-w-[280px] flex-shrink-0 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/30"
            >
              <CardContent className="p-6 pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4 rounded-xl border-2 border-primary/20">
                    <AvatarImage src={speaker.avatar || "/placeholder.svg"} alt={speaker.name} />
                    <AvatarFallback className="rounded-xl">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{speaker.name}</h3>
                  <p className="text-sm text-primary">
                    {speaker.role} at {speaker.company}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 my-3">
                    {speaker.topics.map((topic) => (
                      <Badge
                        key={topic}
                        className={cn("text-xs border", topicColors[topic as keyof typeof topicColors])}
                      >
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{speaker.bio}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-2 p-4 pt-0 pb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href="#" className="flex items-center justify-center gap-1">
                    <span>View Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
