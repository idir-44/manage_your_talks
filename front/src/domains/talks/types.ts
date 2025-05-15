export type TalkStatus = "pending" | "planned" | "approuved" | "declined";

export interface Talk {
  id: string;
  title: string;
  topic: string;
  description: string;
  duration: number; // in seconds
  level: string;
  status: TalkStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  roomName: string;
  startAt: string;
}

export interface CreateTalkRequest {
  title: string;
  topic: string;
  description?: string;
  hours: number;
  minutes: number;
  level: string;
}

export interface UpdateTalkRequest {
  title?: string;
  topic?: string;
  description?: string;
  hours?: number;
  minutes?: number;
  level?: string;
  status?: TalkStatus;
}

export interface GetTalksRequst {
  ownerId?: string;
  status?: TalkStatus;
  level?: string;
}

export interface ScheduleTalkRequest {
  roomId: string;
  talkId: string;
  startAt: string;
}
