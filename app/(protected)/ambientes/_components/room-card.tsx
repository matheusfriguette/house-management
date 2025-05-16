"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { DashboardRoom } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function RoomCard({ room }: { room: DashboardRoom }) {
  const isDone = room.boughtItems === room.totalItems;
  const percent = room.totalItems > 0 ? (room.boughtItems / room.totalItems) * 100 : isDone ? 100 : 0;

  const gradientLight = `conic-gradient(var(--color-teal-500) 0% ${percent}%, var(--color-zinc-200) ${percent}% 100%)`;
  const gradientDark = `conic-gradient(var(--color-teal-500) 0% ${percent}%, var(--color-zinc-800) ${percent}% 100%)`;

  return (
    <Link
      href={`/ambientes/${room.slug}`}
      className="relative flex flex-col rounded-lg border border-zinc-200 bg-white p-4 hover:ring-2 hover:ring-teal-500 focus:outline-2 focus:outline-offset-2 focus:outline-teal-500 sm:p-6 dark:border-white/10 dark:bg-zinc-900"
    >
      <div className="absolute -top-4 -right-2 h-12 w-12">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full dark:hidden" style={{ backgroundImage: gradientLight }} />
          <div className="absolute inset-0 hidden rounded-full dark:block" style={{ backgroundImage: gradientDark }} />

          <div className="absolute inset-1 rounded-full bg-white dark:bg-zinc-900"></div>

          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-zinc-900 dark:text-zinc-100">
            {isDone ? <CheckIcon className="size-6 text-teal-500" /> : `${room.boughtItems}/${room.totalItems}`}
          </div>
        </div>
      </div>

      <div className="line-clamp-2 text-lg font-medium">{room.name}</div>

      <div className="mt-8 space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-zinc-500 dark:text-zinc-400">Custo atual</div>
          <div className="font-medium">{formatMoney(room.favoriteCost)}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-zinc-500 dark:text-zinc-400">Custo mais baixo</div>
          <div className="font-medium">{formatMoney(room.cheapestCost)}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-2">
        {room.itemsByPriority.low.total > 0 && (
          <Badge color="green">
            Baixa: {room.itemsByPriority.low.bought} de {room.itemsByPriority.low.total}
          </Badge>
        )}
        {room.itemsByPriority.medium.total > 0 && (
          <Badge color="yellow">
            Média: {room.itemsByPriority.medium.bought} de {room.itemsByPriority.medium.total}
          </Badge>
        )}
        {room.itemsByPriority.high.total > 0 && (
          <Badge color="red">
            Alta: {room.itemsByPriority.high.bought} de {room.itemsByPriority.high.total}
          </Badge>
        )}
      </div>
    </Link>
  );
}
