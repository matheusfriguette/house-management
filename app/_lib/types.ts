export type Room = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  room_id: string;
  name: string;
  description?: string;
  priority: "low" | "medium" | "high";
  is_purchased: boolean;
  purchase_options: PurchaseOption[];
};

export type PurchaseOption = {
  id: string;
  url: string;
  price: number;
  label?: string;
  is_favorite: boolean;
};

export type CreateItemDto = {
  room_id: string;
  name: string;
  description?: string;
  priority: "low" | "medium" | "high";
};

export type CreatePurchaseOptionDto = {
  item_id: string;
  url: string;
  price: number;
  label?: string;
};
