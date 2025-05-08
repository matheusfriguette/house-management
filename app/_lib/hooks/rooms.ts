import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/toast-context";
import { createRoom } from "@/lib/api/rooms";
import { CreateRoomDto } from "@/lib/dtos";
import { Room } from "@/lib/types";

export function useRooms() {
  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const createRoomMutation = useMutation({
    mutationFn: async (data: CreateRoomDto) => createRoom(data),
    onSuccess: (room) => {
      queryClient.setQueryData(["rooms"], (rooms: Room[]) => {
        return [...rooms, room];
      });
      showToast({ message: "Ambiente adicionado com sucesso!", state: "error" });
    },
    onError: () => {
      showToast({ message: "Erro ao adicionar ambiente!", state: "error" });
    },
  });

  return {
    createRoomMutation,
  };
}
