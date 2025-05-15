import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDuration } from "@/lib/utils";
import type { Talk } from "@/domains/talks/types";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import UpdateTalkModal from "./UpdateTalkModal";

interface TalksTableProps {
  talks: Talk[];
}

export default function TalksTable({ talks }: TalksTableProps) {
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleViewTalk = (talk: Talk) => {
    setSelectedTalk(talk);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
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
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {talks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No talks found. Create your first talk!
                </TableCell>
              </TableRow>
            ) : (
              talks.map((talk) => (
                <TableRow key={talk.id}>
                  <TableCell className="font-medium">{talk.title}</TableCell>
                  <TableCell>{talk.topic}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {talk.description}
                  </TableCell>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewTalk(talk)}
                      title="View/Edit Talk"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {selectedTalk && (
        <UpdateTalkModal
          talk={selectedTalk}
          isOpen={isUpdateModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
