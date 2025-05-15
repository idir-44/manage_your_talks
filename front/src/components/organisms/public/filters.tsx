"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronDown, ChevronsUpDown, Filter, X } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Calendar } from "@/components/molecules/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/molecules/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/molecules/popover"
import { Badge } from "@/components/atoms/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/molecules/collapsible"

// Sample data
const topics = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "ai", label: "AI & Machine Learning" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "devops", label: "DevOps" },
  { value: "security", label: "Security" },
  { value: "mobile", label: "Mobile Development" },
]

const rooms = [
  { value: "main", label: "Main Hall" },
  { value: "workshop", label: "Workshop Room" },
  { value: "theater", label: "Theater" },
  { value: "blue", label: "Blue Room" },
  { value: "green", label: "Green Room" },
]

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

interface PublicFiltersProps {
  selectedDate: string
  onDateChange: (date: string) => void
  selectedTopics: string[]
  onTopicsChange: (topics: string[]) => void
  selectedRooms: string[]
  onRoomsChange: (rooms: string[]) => void
  selectedLevels: string[]
  onLevelsChange: (levels: string[]) => void
}

export function PublicFilters({
  selectedDate,
  onDateChange,
  selectedTopics,
  onTopicsChange,
  selectedRooms,
  onRoomsChange,
  selectedLevels,
  onLevelsChange,
}: PublicFiltersProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined)
  const [topicsOpen, setTopicsOpen] = useState(false)
  const [roomsOpen, setRoomsOpen] = useState(false)
  const [levelsOpen, setLevelsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      onDateChange(format(date, "yyyy-MM-dd"))
    }
  }

  const handleTopicSelect = (value: string) => {
    onTopicsChange(
      selectedTopics.includes(value) ? selectedTopics.filter((topic) => topic !== value) : [...selectedTopics, value],
    )
  }

  const handleRoomSelect = (value: string) => {
    onRoomsChange(
      selectedRooms.includes(value) ? selectedRooms.filter((room) => room !== value) : [...selectedRooms, value],
    )
  }

  const handleLevelSelect = (value: string) => {
    onLevelsChange(
      selectedLevels.includes(value) ? selectedLevels.filter((level) => level !== value) : [...selectedLevels, value],
    )
  }

  const clearFilters = () => {
    onTopicsChange([])
    onRoomsChange([])
    onLevelsChange([])
  }

  const hasActiveFilters = selectedTopics.length > 0 || selectedRooms.length > 0 || selectedLevels.length > 0
  const totalFilterCount = selectedTopics.length + selectedRooms.length + selectedLevels.length

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 backdrop-blur-sm p-4 rounded-xl">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">
              Filters {totalFilterCount > 0 && <span className="ml-1">({totalFilterCount})</span>}
            </h3>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </CollapsibleTrigger>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      <CollapsibleContent className="overflow-hidden transition-all">
        <div className="bg-card/50 backdrop-blur-sm p-4 space-y-4 rounded-xl border mt-2">
          <div className="flex flex-col space-y-4 md:flex-row md:items-end md:flex-wrap md:gap-4 md:space-y-0">
            {/* Date Picker */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left sm:w-[200px] border-primary/20 hover:border-primary"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Topics Filter */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">Topics</label>
              <Popover open={topicsOpen} onOpenChange={setTopicsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={topicsOpen}
                    className="w-full justify-between sm:w-[200px] border-primary/20 hover:border-primary"
                  >
                    {selectedTopics.length > 0 ? `${selectedTopics.length} selected` : "Select topics"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search topics..." />
                    <CommandList>
                      <CommandEmpty>No topic found.</CommandEmpty>
                      <CommandGroup>
                        {topics.map((topic) => (
                          <CommandItem
                            key={topic.value}
                            value={topic.value}
                            onSelect={() => handleTopicSelect(topic.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-primary",
                                selectedTopics.includes(topic.value) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {topic.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Rooms Filter */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">Rooms</label>
              <Popover open={roomsOpen} onOpenChange={setRoomsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={roomsOpen}
                    className="w-full justify-between sm:w-[200px] border-primary/20 hover:border-primary"
                  >
                    {selectedRooms.length > 0 ? `${selectedRooms.length} selected` : "Select rooms"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search rooms..." />
                    <CommandList>
                      <CommandEmpty>No room found.</CommandEmpty>
                      <CommandGroup>
                        {rooms.map((room) => (
                          <CommandItem
                            key={room.value}
                            value={room.value}
                            onSelect={() => handleRoomSelect(room.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-primary",
                                selectedRooms.includes(room.value) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {room.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Levels Filter */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">Levels</label>
              <Popover open={levelsOpen} onOpenChange={setLevelsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={levelsOpen}
                    className="w-full justify-between sm:w-[200px] border-primary/20 hover:border-primary"
                  >
                    {selectedLevels.length > 0 ? `${selectedLevels.length} selected` : "Select levels"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search levels..." />
                    <CommandList>
                      <CommandEmpty>No level found.</CommandEmpty>
                      <CommandGroup>
                        {levels.map((level) => (
                          <CommandItem
                            key={level.value}
                            value={level.value}
                            onSelect={() => handleLevelSelect(level.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-primary",
                                selectedLevels.includes(level.value) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {level.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedTopics.map((topic) => {
                const topicLabel = topics.find((t) => t.value === topic)?.label
                return (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="gap-1 bg-primary/5 border-primary/20 hover:bg-primary/10"
                  >
                    {topicLabel}
                    <button
                      onClick={() => handleTopicSelect(topic)}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {topicLabel} filter</span>
                    </button>
                  </Badge>
                )
              })}
              {selectedRooms.map((room) => {
                const roomLabel = rooms.find((r) => r.value === room)?.label
                return (
                  <Badge
                    key={room}
                    variant="outline"
                    className="gap-1 bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10"
                  >
                    {roomLabel}
                    <button
                      onClick={() => handleRoomSelect(room)}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {roomLabel} filter</span>
                    </button>
                  </Badge>
                )
              })}
              {selectedLevels.map((level) => {
                const levelLabel = levels.find((l) => l.value === level)?.label
                return (
                  <Badge
                    key={level}
                    variant="outline"
                    className="gap-1 bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10"
                  >
                    {levelLabel}
                    <button
                      onClick={() => handleLevelSelect(level)}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {levelLabel} filter</span>
                    </button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
