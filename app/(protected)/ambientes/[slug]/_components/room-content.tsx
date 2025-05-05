"use client";

import { useQuery } from "@tanstack/react-query";

import { Heading } from "@/components/ui/heading";
import { getRoom } from "@/lib/api/rooms";
import { CreateItemDialog } from "./create-item-dialog";
import { ItemCard } from "./item-card";

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

        <ul className="mt-10 divide-y divide-zinc-950/10 rounded-lg border border-zinc-950/10 dark:divide-white/10 dark:border-white/10">
          {room.items.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
