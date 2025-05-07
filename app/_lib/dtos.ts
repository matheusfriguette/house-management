import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createRoomSchema = z.object({
  name: z.string().min(1, "Campo obrigatório").max(50, "O campo deve possuir no máximo 50 caracteres"),
});

export const createEditItemSchema = z.object({
  name: z.string().min(1, "Campo obrigatório").max(50, "O campo deve possuir no máximo 50 caracteres"),
  description: z.string().max(50, "O campo deve possuir no máximo 50 caracteres").optional(),
  priority: z.enum(["low", "medium", "high"]),
  roomId: z.string(),
});

export const createPurchaseOptionSchema = z.object({
  url: z.string().min(1, "Campo obrigatório").url("O campo precisa ser uma URL válida"),
  itemId: z.string(),
});

export const editPurchaseOptionSchema = z.object({
  itemId: z.string(),
  url: z.string().min(1, "Campo obrigatório").url("O campo precisa ser uma URL válida"),
  metadata: z.object({
    title: z.string().min(1, "Campo obrigatório").max(50, "O campo deve possuir no máximo 50 caracteres"),
    price: z
      .string()
      .transform((val) => {
        const numeric = val.replace(/[^\d,]/g, "").replace(",", ".");
        return numeric;
      })
      .refine((val) => !isNaN(Number(val)), {
        message: "O campo precisa ser um valor válido",
      }),
    imageUrl: z.string().min(1, "Campo obrigatório"),
  }),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type CreateRoomDto = z.infer<typeof createRoomSchema>;
export type CreateEditItemDto = z.infer<typeof createEditItemSchema>;
export type CreatePurchaseOptionDto = z.infer<typeof createPurchaseOptionSchema>;
export type EditPurchaseOptionDto = z.infer<typeof editPurchaseOptionSchema>;
