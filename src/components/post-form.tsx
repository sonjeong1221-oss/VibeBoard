"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PostFormAction = (
  prevState: string | null,
  formData: FormData
) => Promise<string | null>;

export function PostForm({
  action,
  submitLabel,
  defaultValues,
}: {
  action: PostFormAction;
  submitLabel: string;
  defaultValues?: { title: string; author: string; content: string };
}) {
  const [error, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          required
          maxLength={200}
          defaultValue={defaultValues?.title}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="author">작성자</Label>
        <Input
          id="author"
          name="author"
          required
          maxLength={50}
          defaultValue={defaultValues?.author}
          placeholder="작성자 이름을 입력하세요"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={defaultValues?.content}
          placeholder="내용을 입력하세요"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
