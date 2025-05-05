import api from "@/lib/api/client";
import { CreateItemDto } from "@/lib/dtos";

export async function createItem(dto: CreateItemDto) {
  return await api.post("/items", dto);
}

export async function deleteItem(id: string) {
  return await api.get(`/items/${id}`);
}

export async function togglePurchased(id: string) {
  return await api.get(`/items/${id}/toggle-purchased`);
}
