import api from "@/lib/api/client";
import { CreateRoomDto } from "@/lib/dtos";
import { Room } from "@/lib/types";

export async function listRooms(): Promise<Room[]> {
  return await api.get("/rooms");
}

export async function getRoom(slug: string): Promise<Room> {
  return await api.get(`/rooms/${slug}`);
}

export async function createRoom(dto: CreateRoomDto) {
  return await api.post("/rooms", dto);
}
