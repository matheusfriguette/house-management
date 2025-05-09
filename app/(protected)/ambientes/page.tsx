"use client";

import { useQuery } from "@tanstack/react-query";

import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { listRooms } from "@/lib/api/rooms";
import { CreateRoomDialog } from "./_components/create-room-dialog";
import { RoomCard } from "./_components/room-card";
import { StatsCards } from "./_components/stats-card";

function RoomsSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <Divider className="my-8" />

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-44 w-full rounded-lg sm:h-52" />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => listRooms(),
  });

  if (isLoading) return <RoomsSkeleton />;

  if (isSuccess) {
    return (
      <>
        <div className="flex items-center justify-between">
          <Heading>Ambientes</Heading>

          <CreateRoomDialog />
        </div>

        <div className="mt-8">
          <StatsCards
            favoriteCost={data.favoriteCost}
            cheapestCost={data.cheapestCost}
            boughtItems={data.boughtItems}
            totalItems={data.totalItems}
            completedRooms={data.completedRooms}
            totalRooms={data.rooms.length}
          />
        </div>

        <Divider className="my-8" />

        {data.rooms.length > 0 && (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.rooms.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        )}
      </>
    );
  }
}
