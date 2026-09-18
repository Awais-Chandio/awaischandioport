-- Work With Me form submissions.
--
-- RLS is enabled and the only policy is INSERT (added at the end of this file).
-- With no SELECT policy, enquiries can be written through the API but never
-- read back out of it, so they cannot be scraped even if the key is obtained.

create table if not exists public.work_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project_type text not null,
  budget_range text not null,
  timeline text not null,
  description text not null,
  email text not null,
  constraint work_inquiries_description_length check (char_length(description) between 20 and 2000),
  constraint work_inquiries_email_length check (char_length(email) <= 254)
);

alter table public.work_inquiries enable row level security;

create index if not exists work_inquiries_created_at_idx
  on public.work_inquiries (created_at desc);

-- Least privilege: the server route submits with the publishable (anon) key.
-- INSERT is the only permitted operation, and the absence of a SELECT policy
-- means submitted enquiries cannot be read back through the API.
create policy "anon can submit an inquiry"
  on public.work_inquiries
  for insert
  to anon
  with check (true);
