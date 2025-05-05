import api from "@/lib/api/client";
import { CreatePurchaseOptionDto } from "@/lib/dtos";

export async function createPurchaseOption(dto: CreatePurchaseOptionDto) {
  return await api.post("/purchase-options", dto);
}

export async function deletePurchaseOption(id: string) {
  return await api.delete(`/purchase-options/${id}`);
}

export async function toggleFavorite(id: string) {
  return await api.patch(`/purchase-options/${id}/toggle-favorite`);
}
