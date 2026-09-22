import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DeletePostButton } from "@/components/delete-post-button";
import { getPostById, incrementViews } from "@/lib/posts";

function formatDate(isoDate: string) {
  return new Date(isoDate + "Z").toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  const post = Number.isFinite(postId) ? await getPostById(postId) : undefined;

  if (!post) {
    notFound();
  }

  await incrementViews(post.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-lg border bg-white p-6 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.created_at)}</span>
          <span>·</span>
          <span>조회 {post.views + 1}</span>
        </div>
        <Separator className="my-2" />
        <p className="whitespace-pre-wrap leading-7">{post.content}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/">목록으로</Link>}
        />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            nativeButton={false}
            render={<Link href={`/posts/${post.id}/edit`}>수정</Link>}
          />
          <DeletePostButton id={post.id} />
        </div>
      </div>
    </div>
  );
}
