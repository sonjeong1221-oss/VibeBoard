import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostForm } from "@/components/post-form";
import { updatePostAction } from "@/lib/actions";
import { getPostById } from "@/lib/posts";

export default async function EditPostPage({
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

  const boundUpdateAction = updatePostAction.bind(null, post.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">글 수정</h1>
      <Card>
        <CardHeader>
          <CardTitle>게시글 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm
            action={boundUpdateAction}
            submitLabel="수정 완료"
            defaultValues={{
              title: post.title,
              author: post.author,
              content: post.content,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
