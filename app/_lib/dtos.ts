import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createRoomSchema = z.object({
  name: z.string().min(1, "Campo obrigatório").max(50),
});

export const createEditItemSchema = z.object({
  name: z.string().min(1, "Campo obrigatório").max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(["low", "medium", "high"]),
  roomId: z.string(),
});

export const createPurchaseOptionSchema = z.object({
  url: z.string().min(1, "Campo obrigatório").url("O campo precisa ser uma URL válida"),
  itemId: z.string(),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type CreateRoomDto = z.infer<typeof createRoomSchema>;
export type CreateEditItemDto = z.infer<typeof createEditItemSchema>;
export type CreatePurchaseOptionDto = z.infer<typeof createPurchaseOptionSchema>;
