import api from "@/lib/api/client";
import { EditMetadaDto } from "@/lib/dtos";

export async function editMetadata(id: string, dto: EditMetadaDto) {
  return await api.put(`/metadata/${id}`, dto);
}
