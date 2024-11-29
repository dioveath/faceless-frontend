## TODOS
[ ] - Beautiful Landing Page, Sign Up Page, Beautiful Pay Wall
[ ] - Stitch Up Stripe Subscription
[ ] - Deploy to the Internet 
[ ] - Generate VoiceOver API
[ ] - Refactor Task and Generation 


<!-- 
create table
  public.tasks (
    id uuid not null default gen_random_uuid (),
    user_id uuid null,
    status text null,
    progress integer null default 0,
    file_path text null,
    created_at timestamp with time zone not null default now(),
    message text null,
    constraint tasks_pkey primary key (id),
    constraint tasks_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;
 -->