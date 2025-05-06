import api from "@/lib/api/client";
import { CreateEditItemDto } from "@/lib/dtos";

export async function createItem(dto: CreateEditItemDto) {
  return await api.post("/items", dto);
}

export async function editItem(id: string, dto: CreateEditItemDto) {
  return await api.put(`/items/${id}`, dto);
}

export async function deleteItem(id: string) {
  return await api.delete(`/items/${id}`);
}

export async function togglePurchased(id: string) {
  return await api.patch(`/items/${id}/toggle-purchased`);
}
