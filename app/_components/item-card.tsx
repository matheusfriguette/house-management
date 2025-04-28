"use client";

import { createPurchaseOption } from "../_lib/actions/purchaseOptions";
import { CreatePurchaseOptionDto, Item } from "../_lib/types";
import LinkDialog from "./link-dialog";
import { Badge } from "./ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ItemCard({ item }: { item: Item }) {
  const badgeColor = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const handleCreatePurchaseOption = async (
    values: CreatePurchaseOptionDto,
  ) => {
    await createPurchaseOption(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardAction>
          <Badge className={badgeColor[item.priority]}>{item.priority}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LinkDialog
          itemId={item.id}
          purchaseOptions={item.purchase_options}
          onCreatePurchaseOption={handleCreatePurchaseOption}
        />

        <div className="mt-1 flex justify-between text-xs text-gray-500">
          {/* <span>${item.estimatedCost || "?"}</span> */}
          <span>3/5 bought</span> {/* Dynamic later */}
        </div>
      </CardContent>
    </Card>
  );
}
