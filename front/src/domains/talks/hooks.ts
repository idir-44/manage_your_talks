import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTalk,
  getTalks,
  scheduleTalk,
  updateTalk,
  updateTalkStatus,
} from "./fetch";
import type { GetTalksRequst } from "./types";

export function useTalks(req: GetTalksRequst) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["talks", req],
    queryFn: () => getTalks(req),
  });

  return {
    talks: data || [],
    isPending,
    isError,
  };
}

export function useCreateTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTalk,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["talks"] });
    },
  });
}

export function useUpdateTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTalk,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["talks"] });
    },
  });
}

export function useUpdateTalkStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTalkStatus,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["talks"] });
    },
  });
}

export function useScheduleTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleTalk,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["talks"] });
    },
  });
}
