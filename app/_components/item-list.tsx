"use client";
import { Item } from "../_lib/types";
import ItemCard from "./item-card";

export default function ItemList({ items }: { items: Item[] }) {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
