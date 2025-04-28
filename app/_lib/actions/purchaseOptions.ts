"use server";
import { supabase } from "@/lib/supabase";
import { CreatePurchaseOptionDto } from "../types";

export async function createPurchaseOption(dto: CreatePurchaseOptionDto) {
  const { data, error } = await supabase.from("purchase_options").insert([dto]);

  if (error) throw new Error(error.message);

  return data;
}
