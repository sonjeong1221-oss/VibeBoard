-- VibeBoard: dedicated posts table (kept separate from any other
-- app's "posts" table in this same Supabase project).
create table if not exists public.vibeboard_posts (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null,
  content text not null,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS is enabled with no policies: only requests using the secret
-- (service_role-equivalent) key can read/write this table. The app's
-- server-side code uses that key, so the publishable key alone cannot
-- access vibeboard_posts directly from a browser.
alter table public.vibeboard_posts enable row level security;

-- Atomic view-count increment (avoids read-then-write race conditions).
create or replace function public.increment_vibeboard_post_views(post_id bigint)
returns void
language sql
security definer
set search_path = public
as $$
  update public.vibeboard_posts set views = views + 1 where id = post_id;
$$;
