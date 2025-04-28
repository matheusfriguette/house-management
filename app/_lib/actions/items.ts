"use server";
import { supabase } from "@/lib/supabase";
import { CreateItemDto, Item } from "@/lib/types";

export async function listItems(roomId?: string): Promise<Item[]> {
  let query = supabase.from("items").select(`
    *,
    purchase_options (*)
  `);

  if (roomId) {
    query = query.eq("room_id", roomId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
}

export async function createItem(dto: CreateItemDto) {
  const { data, error } = await supabase.from("items").insert([dto]);

  if (error) throw new Error(error.message);

  return data;
}

export async function toggleItemPurchased(
  itemId: string,
  isPurchased: boolean,
) {
  const { data, error } = await supabase
    .from("items")
    .update({ is_purchased: isPurchased })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  return data;
}
