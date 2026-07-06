"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const supabase = createClient();
  await supabase.from("categories").insert({ name });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  const supabase = createClient();
  await supabase.from("categories").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function addItem(formData: FormData) {
  const category_id = String(formData.get("category_id") || "");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);

  if (!category_id || !name) return;

  const supabase = createClient();
  await supabase.from("menu_items").insert({
    category_id,
    name,
    description,
    price,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateItem(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);

  if (!id || !name) return;

  const supabase = createClient();
  await supabase
    .from("menu_items")
    .update({ name, description, price })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteItem(id: string) {
  const supabase = createClient();
  await supabase.from("menu_items").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/");
}
export async function addGalleryItem(formData: FormData) {
  const label = String(formData.get("label") || "").trim();
  const image_url = String(formData.get("image_url") || "").trim();

  if (!label || !image_url) return;

  const supabase = createClient();
  await supabase.from("gallery_items").insert({ label, image_url });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteGalleryItem(id: string) {
  const supabase = createClient();
  await supabase.from("gallery_items").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/");
}export async function updateSettings(formData: FormData) {
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const hours = String(formData.get("hours") || "").trim();
  const map_embed_url = String(formData.get("map_embed_url") || "").trim();

  const supabase = createClient();
  await supabase
    .from("site_settings")
    .update({ phone, whatsapp, address, hours, map_embed_url })
    .eq("id", 1);

  revalidatePath("/admin");
  revalidatePath("/");
}
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
