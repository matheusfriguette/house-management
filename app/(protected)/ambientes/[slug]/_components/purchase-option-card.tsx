import { EllipsisVerticalIcon, StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { useAlert } from "@/components/alert-context";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/ui/dropdown";
import { Text } from "@/components/ui/text";
import { useItems } from "@/lib/hooks/items";
import { PurchaseOption } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { EditMetadataDialog } from "./edit-metadata-dialog";

export function PurchaseOptionCard({ itemId, purchaseOption }: { itemId: string; purchaseOption: PurchaseOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const { deletePurchaseOptionMutation, toggleFavoriteMutation } = useItems();
  const { showAlert } = useAlert();

  const handleDelete = () => {
    showAlert({
      title: "Você tem certeza que deseja deletar esse link?",
      onClose: () => {
        deletePurchaseOptionMutation.mutate(purchaseOption.id);
      },
    });
  };

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: purchaseOption.id, itemId });
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="relative h-48 bg-zinc-200 dark:bg-zinc-700">
        <Image
          src={purchaseOption.metadata.imageUrl}
          alt={purchaseOption.metadata.title}
          className="h-full w-full object-contain object-center sm:h-full sm:w-full"
          fill
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-1">
          <a className="line-clamp-2 text-sm font-medium hover:text-teal-500" href={purchaseOption.url} target="_blank">
            {purchaseOption.metadata.title}
          </a>

          <Dropdown>
            <DropdownButton plain>
              <EllipsisVerticalIcon />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem onClick={() => setIsOpen(true)}>Editar</DropdownItem>
              <DropdownItem onClick={handleDelete}>Deletar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Text>{new URL(purchaseOption.url).hostname}</Text>

        <div className="flex items-center justify-between gap-1">
          <div className="font-medium">{formatMoney(purchaseOption.metadata.price)}</div>

          <Button
            plain
            className="group transition-all data-hover:!bg-yellow-500/10 data-hover:![--btn-icon:var(--color-yellow-500)] data-[favorite=true]:![--btn-icon:var(--color-yellow-500)]"
            data-favorite={purchaseOption.isFavorite}
            onClick={handleToggleFavorite}
          >
            <StarIcon className={clsx(purchaseOption.isFavorite && "animate-pop")} />
          </Button>
        </div>
      </div>

      <EditMetadataDialog metadata={purchaseOption.metadata} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
