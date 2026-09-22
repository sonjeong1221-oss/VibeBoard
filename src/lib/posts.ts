import { supabase } from "@/lib/supabase";

export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
}

const TABLE = "vibeboard_posts";

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ?? undefined;
}

export async function incrementViews(id: number): Promise<void> {
  const { error } = await supabase.rpc("increment_vibeboard_post_views", {
    post_id: id,
  });
  if (error) throw error;
}

export async function createPost(input: {
  title: string;
  author: string;
  content: string;
}): Promise<number> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function updatePost(
  id: number,
  input: { title: string; author: string; content: string }
): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

export async function deletePost(id: number): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
