create table rsvp(
id bigint generated always as identity primary key,
name text not null,
phone text,
attending boolean,
adults int default 1,
children int default 0,
family_members text,
message text,
created_at timestamp default now()
);

alter table rsvp enable row level security;

create policy "Anyone can RSVP"
on rsvp for insert to anon
with check (true);

create policy "Admin can read"
on rsvp for select to authenticated
using (true);
