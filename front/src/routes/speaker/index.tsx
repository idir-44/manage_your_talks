"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { TalkList } from "@/components/organisms/talk-list"
import { TalkForm } from "@/components/molecules/talk-form"
import { Notifications } from "@/components/atoms/notifications"
import { Button } from "@/components/atoms/button"
import { PlusCircle, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/molecules/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules/tabs"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/speaker/")({
    component: SpeakerDashboard,
  })
export default function SpeakerDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTalk, setEditingTalk] = useState<any>(null)
  const [talks, setTalks] = useState<any[]>([
    {
      id: "talk1",
      title: "Building Modern UIs with React 18",
      topic: "react",
      duration: 60,
      level: "intermediate",
      description:
        "Learn about the latest features in React 18 and how to use them to build modern, performant user interfaces.",
      status: "accepted",
      submittedAt: "2025-03-15T10:30:00Z",
    },
    {
      id: "talk2",
      title: "Next.js 15: The Future of React Applications",
      topic: "nextjs",
      duration: 90,
      level: "beginner",
      description: "Explore the new features in Next.js 15 and how they can improve your development workflow.",
      status: "scheduled",
      submittedAt: "2025-03-10T14:45:00Z",
      scheduledDate: "2025-05-15",
      scheduledTime: "9:00 AM",
      scheduledRoom: "Theater",
    },
    {
      id: "talk3",
      title: "Advanced TypeScript Patterns",
      topic: "typescript",
      duration: 120,
      level: "advanced",
      description: "Deep dive into advanced TypeScript patterns and how to leverage the type system for safer code.",
      status: "pending",
      submittedAt: "2025-04-05T09:15:00Z",
    },
    {
      id: "talk4",
      title: "State Management in React",
      topic: "react",
      duration: 60,
      level: "intermediate",
      description: "Compare different state management solutions in React and when to use each one.",
      status: "rejected",
      submittedAt: "2025-03-20T16:00:00Z",
      rejectionReason: "Similar topic already accepted from another speaker.",
    },
  ])

  const handleCreateTalk = (talkData: any) => {
    const newTalk = {
      id: `talk${talks.length + 1}`,
      ...talkData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    setTalks([...talks, newTalk])
    setIsFormOpen(false)
  }

  const handleUpdateTalk = (talkData: any) => {
    setTalks(talks.map((talk) => (talk.id === talkData.id ? { ...talk, ...talkData } : talk)))
    setIsFormOpen(false)
    setEditingTalk(null)
  }

  const handleDeleteTalk = (talkId: string) => {
    setTalks(talks.filter((talk) => talk.id !== talkId))
  }

  const handleEditTalk = (talk: any) => {
    setEditingTalk(talk)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingTalk(null)
  }

  // Count talks by status
  const pendingCount = talks.filter((talk) => talk.status === "pending").length
  const acceptedCount = talks.filter((talk) => talk.status === "accepted" || talk.status === "scheduled").length
  const rejectedCount = talks.filter((talk) => talk.status === "rejected").length

  return (
    <DashboardLayout role="speaker">
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute -top-24 -right-24 h-80 w-80 bg-gradient-to-bl from-primary/20 via-primary/5 to-transparent -z-10 rounded-full blur-3xl" />
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <div className="inline-block">
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
                  My Talks
                </h1>
                <div className="h-1 w-1/3 bg-gradient-to-r from-primary to-purple-600 mt-2 rounded-full"></div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Submit and manage your talk proposals. Track their status and get notified when they're reviewed.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1 border-primary/20 hover:bg-primary/5">
                <Upload className="h-4 w-4" />
                <span>Import Slides</span>
              </Button>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="gap-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Submit New Talk</span>
              </Button>
            </div>
          </div>
        </div>

        <Notifications />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-full p-1 bg-muted/50 backdrop-blur-sm dark:bg-muted/20">
            <TabsTrigger
              value="all"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all"
            >
              <div className="px-3 py-1.5">All ({talks.length})</div>
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all"
            >
              <div className="px-3 py-1.5">Pending ({pendingCount})</div>
            </TabsTrigger>
            <TabsTrigger
              value="accepted"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all"
            >
              <div className="px-3 py-1.5">Accepted ({acceptedCount})</div>
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all"
            >
              <div className="px-3 py-1.5">Rejected ({rejectedCount})</div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <TalkList talks={talks} onEdit={handleEditTalk} onDelete={handleDeleteTalk} />
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <TalkList
              talks={talks.filter((talk) => talk.status === "pending")}
              onEdit={handleEditTalk}
              onDelete={handleDeleteTalk}
            />
          </TabsContent>

          <TabsContent value="accepted" className="mt-4">
            <TalkList
              talks={talks.filter((talk) => talk.status === "accepted" || talk.status === "scheduled")}
              onEdit={handleEditTalk}
              onDelete={handleDeleteTalk}
            />
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <TalkList
              talks={talks.filter((talk) => talk.status === "rejected")}
              onEdit={handleEditTalk}
              onDelete={handleDeleteTalk}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={isFormOpen} onOpenChange={closeForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{editingTalk ? "Edit Talk" : "Submit New Talk"}</DialogTitle>
              <DialogDescription>
                {editingTalk
                  ? "Update your talk details below."
                  : "Fill out the form below to submit a new talk proposal."}
              </DialogDescription>
            </DialogHeader>
            <TalkForm
              initialData={editingTalk}
              onSubmit={editingTalk ? handleUpdateTalk : handleCreateTalk}
              onCancel={closeForm}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
