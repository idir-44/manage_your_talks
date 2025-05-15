import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { PublicAgenda } from "@/components/organisms/public/agenda"
import { PublicFilters } from "@/components/organisms/public/filters"
import { SpeakerSpotlight } from "@/components/organisms/public/speaker-spotlight"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules/tabs"
import { CalendarDays, Users } from "lucide-react"


export const Route = createFileRoute("/public/")({
  component: PublicDashboard,
})

function PublicDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>("2025-05-15")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (talkId: string) => {
    setFavorites((prev) => (prev.includes(talkId) ? prev.filter((id) => id !== talkId) : [...prev, talkId]))
  }

  return (
    <DashboardLayout role="public">
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute -top-24 -left-24 right-0 h-80 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent -z-10 rounded-full blur-3xl" />
          <div className="flex flex-col space-y-2">
            <div className="inline-block">
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
                Conference Schedule
              </h1>
              <div className="h-1 w-1/3 bg-gradient-to-r from-primary to-purple-600 mt-2 rounded-full"></div>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Browse the full conference schedule and create your personalized agenda by favoriting talks you're
              interested in attending.
            </p>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-full p-1 bg-muted/50 backdrop-blur-sm dark:bg-muted/20">
            <TabsTrigger
              value="schedule"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-2 px-3 py-1.5">
                <CalendarDays className="h-4 w-4" />
                <span>Schedule</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="speakers"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-2 px-3 py-1.5">
                <Users className="h-4 w-4" />
                <span>Speakers</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6 space-y-6">
          <PublicFilters
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              selectedTopics={selectedTopics}
              onTopicsChange={setSelectedTopics}
              selectedRooms={selectedRooms}
              onRoomsChange={setSelectedRooms}
              selectedLevels={selectedLevels}
              onLevelsChange={setSelectedLevels}
            />

          <PublicAgenda
              date={selectedDate}
              topicFilters={selectedTopics}
              roomFilters={selectedRooms}
              levelFilters={selectedLevels}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
              <p className="text-red-600">Test de rendu OK</p>
          </TabsContent>

          <TabsContent value="speakers" className="mt-6">
            <SpeakerSpotlight />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
