import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

import { Badge } from "@/components/ui/badge";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Text } from "@/components/ui/text";
import { Item } from "@/lib/types";
import { getPriorityBadge } from "@/lib/utils";
import LinkDialog from "./link-dialog";

export function ItemList({ roomId, items }: { roomId: string; items: Item[] }) {
  return (
    <ul className="mt-10 divide-y divide-zinc-950/10 dark:divide-white/10">
      {items.map((item) => {
        const priorityBadge = getPriorityBadge(item.priority);

        return (
          <li key={item.id} className="flex items-center justify-between">
            <div className="flex gap-6 py-4">
              <div className="space-y-1">
                <div className="text-base/6 font-semibold">{item.name}</div>
                <Text>{item.description}</Text>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge color={priorityBadge.color}>{priorityBadge.label}</Badge>

              <ButtonGroup>
                <LinkDialog roomId={roomId} itemId={item.id} purchaseOptions={item.purchaseOptions} />
                <ButtonGroupItem>
                  <PencilSquareIcon />
                </ButtonGroupItem>
                <ButtonGroupItem>
                  <TrashIcon />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
