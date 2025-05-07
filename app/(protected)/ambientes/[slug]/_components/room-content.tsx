"use client";

import { useQuery } from "@tanstack/react-query";

import { SlugProvider } from "@/components/slug-context";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoom } from "@/lib/api/rooms";
import { CreateEditItemDialog } from "./create-edit-item-dialog";
import { ItemCard } from "./item-card";

function RoomContentSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-28" />
      </div>

      <ul className="mt-10 divide-y divide-zinc-950/10 rounded-lg border border-zinc-950/10 dark:divide-white/10 dark:border-white/10">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-36 sm:w-64" />
                  <Skeleton className="h-5 w-12 block sm:hidden" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-12 hidden sm:block" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoomContent({ slug }: { slug: string }) {
  const {
    data: room,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["room", slug],
    queryFn: () => getRoom(slug),
  });

  if (isLoading) {
    return <RoomContentSkeleton />;
  }

  if (isSuccess) {
    return (
      <SlugProvider slug={slug}>
        <div className="flex items-center justify-between">
          <Heading>{room.name}</Heading>

          <CreateEditItemDialog roomId={room.id} />
        </div>

        {room.items.length > 0 && (
          <ul className="mt-10 divide-y divide-zinc-950/10 rounded-lg border border-zinc-950/10 dark:divide-white/10 dark:border-white/10">
            {room.items.map((item) => (
              <li key={item.id}>
                <ItemCard roomId={room.id} item={item} />
              </li>
            ))}
          </ul>
        )}
      </SlugProvider>
    );
  }
}
