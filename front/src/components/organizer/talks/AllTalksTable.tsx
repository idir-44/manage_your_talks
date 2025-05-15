"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import type { Talk } from "@/domains/talks/types";
import ScheduleTalkModal from "./ScheduleTalkModal";

interface TalksTableProps {
  talks: Talk[];
}

export default function AllTalksTable({ talks }: TalksTableProps) {
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleManageTalk = (talk: Talk) => {
    setSelectedTalk(talk);
    setIsScheduleModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsScheduleModalOpen(false);
    setSelectedTalk(null);
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {talks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No talks found with the selected filter.
                </TableCell>
              </TableRow>
            ) : (
              talks.map((talk) => (
                <TableRow key={talk.id}>
                  <TableCell className="font-medium">{talk.title}</TableCell>
                  <TableCell>{talk.topic}</TableCell>
                  <TableCell>{formatDuration(talk.duration)}</TableCell>
                  <TableCell>{talk.level}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {talk.status === "planned" ? (
                      <div className="text-xs">
                        <div>{talk.roomName}</div>
                        <div className="text-gray-500">
                          {new Date(talk.startAt!).toLocaleString("fr-FR")}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">
                        Not scheduled
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleManageTalk(talk)}
                      title="Manage Talk"
                    >
                      {talk.status === "planned" ? (
                        <Calendar className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedTalk && (
        <ScheduleTalkModal
          talk={selectedTalk}
          isOpen={isScheduleModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
