import { db } from "@/lib/db";

export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export function getAllPosts(): Post[] {
  return db
    .prepare("SELECT * FROM posts ORDER BY id DESC")
    .all() as Post[];
}

export function getPostById(id: number): Post | undefined {
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as
    | Post
    | undefined;
}

export function incrementViews(id: number): void {
  db.prepare("UPDATE posts SET views = views + 1 WHERE id = ?").run(id);
}

export function createPost(input: {
  title: string;
  author: string;
  content: string;
}): number {
  const result = db
    .prepare(
      "INSERT INTO posts (title, author, content) VALUES (@title, @author, @content)"
    )
    .run(input);
  return Number(result.lastInsertRowid);
}

export function updatePost(
  id: number,
  input: { title: string; author: string; content: string }
): void {
  db.prepare(
    `UPDATE posts
     SET title = @title, author = @author, content = @content, updated_at = datetime('now')
     WHERE id = @id`
  ).run({ ...input, id });
}

export function deletePost(id: number): void {
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
}
