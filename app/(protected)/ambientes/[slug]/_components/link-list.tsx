import { StarIcon, TrashIcon } from "@heroicons/react/20/solid";

import { Button } from "@/components/ui/button";
import { PurchaseOption } from "@/lib/types";

export function LinkList({
  purchaseOptions,
  onDelete,
}: {
  purchaseOptions: PurchaseOption[];
  onDelete: (id: string) => void;
}) {
  return (
    <ul className="divide-y divide-zinc-950/10 dark:divide-white/10">
      {purchaseOptions.map((option, i) => (
        <li key={i} className="flex items-center justify-between gap-2 py-2">
          <div className="flex-1 space-y-1 truncate">
            <a href={option.url} target="_blank" className="text-teal-500 hover:underline">
              {new URL(option.url).hostname}
            </a>

            {/* <div className="text-zinc-500 dark:text-zinc-400">{formatMoney(option.price)}</div> */}
          </div>

          <div className="flex items-center gap-1">
            <Button plain className="group data-hover:!bg-red-500/10" onClick={() => onDelete(option.id)}>
              <TrashIcon className="group-hover:!text-red-500" />
            </Button>

            <Button
              plain
              data-favorite={option.isFavorite}
              className="group data-hover:!bg-yellow-500/10 data-hover:![--btn-icon:var(--color-yellow-500)] data-[favorite=true]:![--btn-icon:var(--color-yellow-500)]"
            >
              <StarIcon />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
