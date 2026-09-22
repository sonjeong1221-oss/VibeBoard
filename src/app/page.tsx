import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllPosts } from "@/lib/posts";

function formatDate(isoDate: string) {
  return new Date(isoDate + "Z").toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">게시글 목록</h1>
        <Button nativeButton={false} render={<Link href="/posts/new">글쓰기</Link>} />
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-24 text-center text-muted-foreground">
          <p>아직 작성된 글이 없습니다.</p>
          <p className="text-sm">첫 번째 글을 작성해보세요.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-white dark:bg-zinc-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-32">작성자</TableHead>
                <TableHead className="w-40">작성일</TableHead>
                <TableHead className="w-16 text-right">조회수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="text-muted-foreground">
                    {post.id}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/posts/${post.id}`}
                      className="font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(post.created_at)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {post.views}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
