import { useQuery } from "@tanstack/react-query";
import { getRooms } from "./fetch";

export function useRooms() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return {
    rooms: data || [],
    isPending,
    isError,
  };
}
