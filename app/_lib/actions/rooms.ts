"use server";
import { supabase } from "@/lib/supabase";

export async function createRoom(name: string) {
  const { data, error } = await supabase.from("rooms").insert([{ name }]);
  if (error) throw new Error(error.message);
  return data;
}

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) throw new Error(error.message);
  return data;
}
