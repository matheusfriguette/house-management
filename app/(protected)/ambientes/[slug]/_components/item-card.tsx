import { ChevronDownIcon, ChevronUpIcon, LinkIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Text } from "@/components/ui/text";
import { Item } from "@/lib/types";
import { getPriorityBadge } from "@/lib/utils";
import { PurchaseOptionCard } from "./purchase-option-card";

export function ItemCard({ item }: { item: Item }) {
  const priorityBadge = getPriorityBadge(item.priority);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <div className="flex gap-6 py-4">
          <div className="flex items-center gap-2">
            <Button plain onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
            <div className="space-y-1">
              <div className="text-base/6 font-semibold">{item.name}</div>
              <Text>{item.description}</Text>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge color={priorityBadge.color}>{priorityBadge.label}</Badge>

          <ButtonGroup>
            <ButtonGroupItem>
              <PencilSquareIcon />
            </ButtonGroupItem>
            <ButtonGroupItem>
              <TrashIcon />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-zinc-950/10 bg-zinc-100 p-4 dark:border-white/10 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div className="font-medium">Links adicionados</div>
            <Button outline>
              Adicionar link
              <LinkIcon />
            </Button>
          </div>

          {item.purchaseOptions.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
              {item.purchaseOptions.map((purchaseOption) => (
                <PurchaseOptionCard key={purchaseOption.id} purchaseOption={purchaseOption} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
