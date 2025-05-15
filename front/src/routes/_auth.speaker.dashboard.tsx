import Button from "@/components/atoms/Button";
import CreateTalkModal from "@/components/talks/CreateTalkModal";
import TalksTable from "@/components/talks/TalksTable";
import { useAuth } from "@/contexts/auth";
import { useTalks } from "@/domains/talks/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/speaker/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { talks, isPending } = useTalks({
    ownerId: user?.id || "",
  });

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Talks</h1>
        <Button
          className="flex justify-center items-center"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Talk
        </Button>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading talks...</div>
        </div>
      ) : (
        <TalksTable talks={talks} />
      )}

      <CreateTalkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
