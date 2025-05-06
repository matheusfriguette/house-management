import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, ClockIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { useAlert } from "@/components/alert-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Text } from "@/components/ui/text";
import { useItems } from "@/lib/hooks/items";
import { Item } from "@/lib/types";
import { getPriorityBadge } from "@/lib/utils";
import { CreateEditItemDialog } from "./create-edit-item-dialog";
import CreatePurchaseOptionDialog from "./create-purchase-option-dialog";
import { PurchaseOptionCard } from "./purchase-option-card";

export function ItemCard({ roomId, item }: { roomId: string; item: Item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { deleteItemMutation, togglePurchasedMutation } = useItems();
  const { showAlert } = useAlert();

  const handleDelete = () => {
    showAlert({
      title: "Você tem certeza que deseja deletar esse item?",
      onClose: () => {
        deleteItemMutation.mutate(item.id);
      },
    });
  };

  const handleTogglePurchased = () => {
    togglePurchasedMutation.mutate(item.id);
  };

  const priorityBadge = getPriorityBadge(item.priority);

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
            <CreateEditItemDialog roomId={roomId} item={item} />
            <ButtonGroupItem onClick={handleDelete}>
              <TrashIcon />
            </ButtonGroupItem>
            <ButtonGroupItem onClick={handleTogglePurchased}>
              {item.isPurchased ? (
                <>
                  <CheckCircleIcon className="!text-green-500" />
                  <span>Comprado</span>
                </>
              ) : (
                <>
                  <ClockIcon className="!text-yellow-500" />
                  <span>Pendente</span>
                </>
              )}
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-zinc-950/10 bg-zinc-100 p-4 dark:border-white/10 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div className="font-medium">Links adicionados</div>

            <CreatePurchaseOptionDialog itemId={item.id} />
          </div>

          {item.purchaseOptions.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
              {item.purchaseOptions.map((purchaseOption) => (
                <PurchaseOptionCard key={purchaseOption.id} itemId={item.id} purchaseOption={purchaseOption} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
