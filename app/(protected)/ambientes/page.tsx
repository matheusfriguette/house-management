"use client";

import { useQuery } from "@tanstack/react-query";

import { Heading } from "@/components/ui/heading";
import { listRooms } from "@/lib/api/rooms";
import { CreateRoomDialog } from "./_components/create-room-dialog";
import { RoomCard } from "./_components/room-card";

export default function Page() {
  const {
    data: rooms,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => listRooms(),
  });

  if (isLoading) return <p>Carregando...</p>;

  if (isSuccess) {
    return (
      <>
        <div className="flex items-center justify-between">
          <Heading>Ambientes</Heading>

          <CreateRoomDialog />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </>
    );
  }
}
