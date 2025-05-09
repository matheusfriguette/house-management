"use client";

import { formatMoney } from "@/lib/utils";

export function StatsCards({
  favoriteCost,
  cheapestCost,
  boughtItems,
  totalItems,
  completedRooms,
  totalRooms,
}: {
  favoriteCost: number;
  cheapestCost: number;
  boughtItems: number;
  totalItems: number;
  completedRooms: number;
  totalRooms: number;
}) {
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-zinc-900">
        <dt className="truncate font-medium">Custo estimado</dt>
        <dd className="text-2xl font-semibold tracking-tight text-teal-500">{formatMoney(favoriteCost)}</dd>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-zinc-900">
        <dt className="truncate font-medium">Custo mais baixo</dt>
        <dd className="text-2xl font-semibold tracking-tight text-teal-500">{formatMoney(cheapestCost)}</dd>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-zinc-900">
        <dt className="truncate font-medium">Itens comprados</dt>
        <dd className="flex items-baseline text-xl font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
          {boughtItems} de<span className="ml-1 text-2xl font-semibold text-teal-500"> {totalItems}</span>
        </dd>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-zinc-900">
        <dt className="truncate font-medium">Ambientes prontos</dt>
        <dd className="flex items-baseline text-lg font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
          {completedRooms} de<span className="ml-1 text-2xl font-semibold text-teal-500"> {totalRooms}</span>
        </dd>
      </div>
    </dl>
  );
}
