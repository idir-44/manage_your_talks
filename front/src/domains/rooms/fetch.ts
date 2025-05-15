import { apiFetch } from "@/lib/api";
import type { Room } from "./types";

export function getRooms() {
  return apiFetch<Room[]>("/v1/rooms", {
    method: "GET",
  });
}
