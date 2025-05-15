"use client"

import { useState } from "react"
import { Calendar, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/molecules/dialog"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"

// Status badge styles
const statusStyles = {
  pending:
    "border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/50 dark:text-amber-400",
  accepted:
    "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-400",
  scheduled: "border-cyan-500 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-950/50 dark:text-cyan-400",
  rejected: "border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-400",
}

// Topic badge styles
const topicStyles = {
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

// Level badge styles
const levelStyles = {
  beginner:
    "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-400",
  intermediate:
    "border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/50 dark:text-amber-400",
  advanced: "border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-400",
}

interface TalkListProps {
  talks: any[]
  onEdit: (talk: any) => void
  onDelete: (talkId: string) => void
}

export function TalkList({ talks, onEdit, onDelete }: TalkListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [talkToDelete, setTalkToDelete] = useState<string | null>(null)

  const confirmDelete = (talkId: string) => {
    setTalkToDelete(talkId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (talkToDelete) {
      onDelete(talkToDelete)
      setTalkToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const cancelDelete = () => {
    setTalkToDelete(null)
    setDeleteDialogOpen(false)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="space-y-4">
      {talks.length === 0 ? (
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-muted-foreground">You haven&apos;t submitted any talks yet.</p>
            <Button
              variant="outline"
              className="mt-4 border-primary/20 hover:bg-primary/5"
              onClick={() => onEdit(null)}
            >
              Submit your first talk
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {talks.map((talk) => (
            <Card
              key={talk.id}
              className="overflow-hidden group border transition-all hover:shadow-md bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <Badge className={cn("text-xs border", statusStyles[talk.status as keyof typeof statusStyles])}>
                    {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full opacity-70 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(talk)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => confirmDelete(talk.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{talk.title}</CardTitle>
                <CardDescription>Submitted on {formatDate(talk.submittedAt)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge className={cn("text-xs border", topicStyles[talk.topic as keyof typeof topicStyles])}>
                    {talk.topic.charAt(0).toUpperCase() + talk.topic.slice(1)}
                  </Badge>
                  <Badge className={cn("text-xs border", levelStyles[talk.level as keyof typeof levelStyles])}>
                    {talk.level.charAt(0).toUpperCase() + talk.level.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {talk.duration} min
                  </Badge>
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">{talk.description}</p>

                {talk.status === "scheduled" && (
                  <div className="mt-4 rounded-md bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/30 p-3 text-sm">
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-medium">
                      <Calendar className="h-4 w-4" />
                      <p>Scheduled:</p>
                    </div>
                    <p className="text-cyan-700 dark:text-cyan-400 mt-1">
                      {formatDate(talk.scheduledDate)} at {talk.scheduledTime}
                    </p>
                    <p className="text-cyan-700 dark:text-cyan-400">Room: {talk.scheduledRoom}</p>
                  </div>
                )}

                {talk.status === "rejected" && talk.rejectionReason && (
                  <div className="mt-4 rounded-md bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 p-3 text-sm">
                    <p className="font-medium text-rose-700 dark:text-rose-400">Feedback:</p>
                    <p className="text-rose-700 dark:text-rose-400 mt-1">{talk.rejectionReason}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Delete Talk</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this talk? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
