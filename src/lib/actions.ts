"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as posts from "@/lib/posts";

function parsePostInput(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !author || !content) {
    return { ok: false as const, error: "제목, 작성자, 내용을 모두 입력해주세요." };
  }

  return { ok: true as const, data: { title, author, content } };
}

export async function createPostAction(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const parsed = parsePostInput(formData);
  if (!parsed.ok) return parsed.error;

  const id = await posts.createPost(parsed.data);
  revalidatePath("/");
  redirect(`/posts/${id}`);
}

export async function updatePostAction(
  id: number,
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const parsed = parsePostInput(formData);
  if (!parsed.ok) return parsed.error;

  await posts.updatePost(id, parsed.data);
  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

export async function deletePostAction(id: number): Promise<void> {
  await posts.deletePost(id);
  revalidatePath("/");
  redirect("/");
}
