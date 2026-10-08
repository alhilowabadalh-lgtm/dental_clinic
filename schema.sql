-- قاعدة بيانات نظام مواعيد عيادة الأسنان
create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  appointment_date date not null,
  appointment_time time not null,
  service text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

-- السماح للزائر بإرسال حجز فقط
create policy "public can create appointments"
on public.appointments for insert
to anon
with check (true);

-- المدير المسجل فقط يستطيع قراءة وتعديل المواعيد
create policy "authenticated can read appointments"
on public.appointments for select
to authenticated
using (true);

create policy "authenticated can update appointments"
on public.appointments for update
to authenticated
using (true)
with check (true);
