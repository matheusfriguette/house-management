export type Room = {
  id: string;
  name: string;
  slug: string;
  items: Item[];
};

export type Priority = "low" | "medium" | "high";

export type Item = {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  isPurchased: boolean;
  purchaseOptions: PurchaseOption[];
};

export type PurchaseOption = {
  id: string;
  url: string;
  price: number;
  isFavorite: boolean;
};
