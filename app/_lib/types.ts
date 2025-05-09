export type Rooms = {
  favoriteCost: number;
  cheapestCost: number;
  boughtItems: number;
  totalItems: number;
  completedRooms: number;
  rooms: Room[];
};

export type Room = {
  id: string;
  name: string;
  slug: string;
  favoriteCost: number;
  cheapestCost: number;
  totalItems: number;
  boughtItems: number;
  itemsByPriority: {
    high: {
      bought: number;
      total: number;
    };
    medium: {
      bought: number;
      total: number;
    };
    low: {
      bought: number;
      total: number;
    };
  };
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
  isFavorite: boolean;
  metadata: Metadata;
};

export type Metadata = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
};
