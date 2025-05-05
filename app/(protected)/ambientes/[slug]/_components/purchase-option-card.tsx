import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/ui/dropdown";
import { Text } from "@/components/ui/text";
import { PurchaseOption } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export function PurchaseOptionCard({ purchaseOption }: { purchaseOption: PurchaseOption }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="h-48 bg-zinc-200">
        <img
          src={purchaseOption.metadata.imageUrl}
          alt={purchaseOption.metadata.title}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex gap-1">
          <a className="line-clamp-2 text-sm font-medium hover:text-teal-500" href={purchaseOption.url} target="_blank">
            {purchaseOption.metadata.title}
          </a>

          <Dropdown>
            <DropdownButton plain className="!p-1">
              <EllipsisVerticalIcon />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem onClick={() => {}}>Editar</DropdownItem>
              <DropdownItem onClick={() => {}}>Deletar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Text className="">{new URL(purchaseOption.url).hostname}</Text>

        <div className="font-medium">{formatMoney(purchaseOption.metadata.price)}</div>
      </div>
    </div>
  );
}
