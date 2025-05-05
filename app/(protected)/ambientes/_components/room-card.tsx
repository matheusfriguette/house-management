"use client";

import Link from "next/link";

import { Room } from "@/lib/types";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link href={`/ambientes/${room.slug}`}>
      {room.name}
      {/* <Card>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
        </CardHeader>
      </Card> */}
    </Link>
  );
}
