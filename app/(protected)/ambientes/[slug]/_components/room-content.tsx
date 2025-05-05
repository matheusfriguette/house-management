"use client";

import { useQuery } from "@tanstack/react-query";

import { Heading } from "@/components/ui/heading";
import { getRoom } from "@/lib/api/rooms";
import { CreateItemDialog } from "./create-item-dialog";
import { ItemList } from "./item-list";

export function RoomContent({ slug }: { slug: string }) {
  const {
    data: room,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["room", slug],
    queryFn: () => getRoom(slug),
  });

  if (isLoading) return <p>Carregando...</p>;

  if (isSuccess) {
    return (
      <>
        <div className="flex items-center justify-between">
          <Heading>{room.name}</Heading>

          <CreateItemDialog roomId={room.id} roomSlug={slug} />
        </div>

        <ItemList roomId={room.id} items={room.items} />
      </>
    );
  }
}
