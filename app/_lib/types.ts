export type Dashboard = {
  favoriteCost: number;
  cheapestCost: number;
  boughtItems: number;
  totalItems: number;
  completedRooms: number;
  rooms: DashboardRoom[];
};

export type DashboardRoom = {
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
  isFavorite: boolean;
  metadata: Metadata;
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    profileImageUrl: string;
    createdAt: string;
  };
};

export type Metadata = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
};
