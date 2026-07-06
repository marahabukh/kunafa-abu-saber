-- شغّلي هاد الملف كامل داخل Supabase: SQL Editor → New query → Run

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  description text default '',
  price numeric(10,2) not null default 0,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- تفعيل حماية الصفوف (Row Level Security)
alter table categories enable row level security;
alter table menu_items enable row level security;

-- الكل (الزوار) يقدر يقرأ بس، ما يقدر يعدّل
create policy "public can read categories"
  on categories for select
  using (true);

create policy "public can read menu_items"
  on menu_items for select
  using (true);

-- بس المستخدم يلي عامل تسجيل دخول (الأدمن) يقدر يضيف/يعدّل/يحذف
create policy "authenticated can insert categories"
  on categories for insert to authenticated with check (true);
create policy "authenticated can update categories"
  on categories for update to authenticated using (true);
create policy "authenticated can delete categories"
  on categories for delete to authenticated using (true);

create policy "authenticated can insert menu_items"
  on menu_items for insert to authenticated with check (true);
create policy "authenticated can update menu_items"
  on menu_items for update to authenticated using (true);
create policy "authenticated can delete menu_items"
  on menu_items for delete to authenticated using (true);

-- بيانات تجريبية أولية (تقدري تحذفيها/تعدليها من الداشبورد بعدين)
insert into categories (name, sort_order) values
  ('كنافة', 1),
  ('مشروبات', 2)
returning id;
