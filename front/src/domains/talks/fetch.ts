import { apiFetch } from "@/lib/api";
import type {
  CreateTalkRequest,
  GetTalksRequst,
  ScheduleTalkRequest,
  Talk,
  UpdateTalkRequest,
} from "./types";

import qs from "qs";

export function getTalks(req: GetTalksRequst) {
  return apiFetch<Talk[]>(`/v1/talks?${qs.stringify(req)}`);
}

export function createTalk(req: CreateTalkRequest) {
  return apiFetch<Talk>("/v1/talks", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export function updateTalk({
  id,
  req,
}: {
  id: string;
  req: UpdateTalkRequest;
}) {
  return apiFetch<Talk>(`/v1/talks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
}

export function updateTalkStatus({
  id,
  req,
}: {
  id: string;
  req: UpdateTalkRequest;
}) {
  return apiFetch<Talk>(`/v1/talks/organizer/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
}

export function scheduleTalk(req: ScheduleTalkRequest) {
  return apiFetch<Talk>("/v1/talks/schedule", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
