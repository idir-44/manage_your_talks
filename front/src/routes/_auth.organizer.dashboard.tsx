import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTalks } from "@/domains/talks/hooks";
import { z } from "zod";
import type { TalkStatus } from "@/domains/talks/types";
import AllTalksTable from "@/components/organizer/talks/AllTalksTable";

// Define a search schema for your route using your TalkStatus type
const organizerDashboardSearchSchema = z.object({
  // Use z.enum() with the values derived from your TalkStatus type
  status: z
    .enum(["pending", "planned", "approuved", "declined"] as [
      TalkStatus,
      ...TalkStatus[],
    ])
    .optional(), // Type assertion for tuple
});

export const Route = createFileRoute("/_auth/organizer/dashboard")({
  validateSearch: organizerDashboardSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { status: statusFilter } = Route.useSearch();
  const router = useRouter();

  const { talks, isPending } = useTalks({ status: statusFilter });

  const handleStatusChange = (value: string) => {
    router.navigate({
      to: "/organizer/dashboard",
      search: (prevSearch) => {
        if (value === "ALL") {
          // Remove the 'status' property from the search object
          const newSearch = { ...prevSearch };
          delete newSearch.status;
          return newSearch;
        } else {
          // Set or update the 'status' property
          return {
            ...prevSearch, // Preserve other existing search params
            status: value as TalkStatus,
          };
        }
      },
      replace: true, // Optional: Consider replacing the history entry
    });
  };

  // Use your TalkStatus type in the options array as well
  const talkStatusOptions: { value: TalkStatus | "ALL"; label: string }[] = [
    { value: "ALL", label: "All Talks" },
    { value: "pending", label: "Pending" },
    { value: "approuved", label: "Approuved" },
    { value: "declined", label: "Declined" },
    { value: "planned", label: "Planned" },
  ];

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Talks</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Filter by status:</span>
          <Select
            defaultValue={statusFilter || "ALL"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {talkStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading talks...</div>
        </div>
      ) : (
        <AllTalksTable talks={talks} />
      )}
    </div>
  );
}
