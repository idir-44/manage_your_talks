"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDuration } from "@/lib/utils";
import type { Talk, TalkStatus } from "@/domains/talks/types";
import { useScheduleTalk, useUpdateTalkStatus } from "@/domains/talks/hooks";
import { useRooms } from "@/domains/rooms/hooks";

interface ScheduleTalkModalProps {
  talk: Talk;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleTalkModal({
  talk,
  isOpen,
  onClose,
}: ScheduleTalkModalProps) {
  const { mutate: scheduleTalk, isPending } = useScheduleTalk();
  const { mutate: updateTalkStatus } = useUpdateTalkStatus();
  const { rooms } = useRooms();

  const [room, setRoom] = useState<string>();
  const [startDatetimeLocal, setStartDatetimeLocal] = useState<string>("");
  const [status, setStatus] = useState<TalkStatus>(talk.status);

  const isPlanned = talk.status === "planned";
  const isReadOnly = isPlanned;

  // Determine if we're scheduling (setting room and time) or just updating status
  const isScheduling = room && startDatetimeLocal.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time into ISO string if scheduling
    let startAtIso: string | undefined;

    if (isScheduling) {
      const date = new Date(startDatetimeLocal);
      if (isNaN(date.getTime())) {
        console.error("Invalid date or time selected.");
        return;
      }
      const hour = date.getHours();
      const isValidHour = (hour >= 9 && hour < 12) || (hour >= 13 && hour < 19);
      if (!isValidHour) {
        alert("Start time must be between 09–12 or 13–19");
        return;
      }

      startAtIso = date.toISOString();
    }

    if (isScheduling && startAtIso) {
      scheduleTalk(
        {
          talkId: talk.id,
          roomId: room,
          startAt: startAtIso,
        },
        {
          onSuccess: () => {
            onClose();
          },
          onError(error, variables, context) {
            alert(error.message);
          },
        },
      );
    } else if (!isScheduling && status !== talk.status) {
      updateTalkStatus(
        {
          id: talk.id,
          req: { status: status },
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      console.log("No changes to save or scheduling information incomplete.");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {talk.status === "planned" ? "View Talk" : "Manage Talk"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 mb-4 border rounded-md bg-gray-50">
          <h3 className="mb-2 text-sm font-semibold">Talk Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Title:</p>
              <p className="text-gray-700">{talk.title}</p>
            </div>
            <div>
              <p className="font-medium">Topic:</p>
              <p className="text-gray-700">{talk.topic}</p>
            </div>
            <div>
              <p className="font-medium">Duration:</p>
              <p className="text-gray-700">{formatDuration(talk.duration)}</p>
            </div>
            <div>
              <p className="font-medium">Level:</p>
              <p className="text-gray-700">{talk.level}</p>
            </div>
            <div className="flex items-center  gap-2">
              <p className="font-medium">Current Status:</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  talk.status === "approuved"
                    ? "bg-green-100 text-green-800"
                    : talk.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : talk.status === "planned"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {talk.status}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TalkStatus)}
              disabled={isReadOnly}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approuved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Note: Status will automatically change to "Planned" when you
              schedule a talk.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t">
            <h3 className="mb-2 text-sm font-semibold">Schedule Information</h3>
            <p className="mb-4 text-xs text-gray-500">
              Fill in these fields to schedule the talk. This will set the
              status to "Planned".
            </p>

            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Select
                disabled={isReadOnly}
                value={room}
                onValueChange={(value) => setRoom(value)}
              >
                <SelectTrigger id="room">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms?.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="startDatetime">Date and Time</Label>
              <input
                disabled={isReadOnly}
                id="startDatetime"
                type="datetime-local"
                value={startDatetimeLocal}
                onChange={(e) => setStartDatetimeLocal(e.target.value)}
                className="h-10  rounded-md border border-input bg-background 
                           px-3 py-2 text-sm ring-offset-background focus-visible:outline-none 
                           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                           disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
