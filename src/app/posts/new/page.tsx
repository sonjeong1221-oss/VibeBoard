import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostForm } from "@/components/post-form";
import { createPostAction } from "@/lib/actions";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">글쓰기</h1>
      <Card>
        <CardHeader>
          <CardTitle>새 게시글</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm action={createPostAction} submitLabel="등록" />
        </CardContent>
      </Card>
    </div>
  );
}
